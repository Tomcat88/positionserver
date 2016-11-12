package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.netty.handler.codec.http.HttpResponseStatus
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import it.introini.positionserver.routes.*
import org.jetbrains.annotations.NotNull
import org.pmw.tinylog.Logger
import java.time.Instant

@Endpoint(RoutesManager.TRIPS_ROUTE)
class TripsRoute @Inject constructor(val mongoClient: MongoClient) {

    @NotNull @Put fun put(event: RoutingContext) {
        val doc = event.bodyAsJson
        doc.put("ts", Instant.now().toString())
        mongoClient.insert("trips", doc, {
            if (it.succeeded()) {
                event.response().end(doc.encode())
            } else {
                Logger.error(it.cause())
                event.fail(it.cause())
            }
        })
    }

    @NotNull @Get fun get(event: RoutingContext) {
        mongoClient.find("trips", JsonObject(), {
            if (it.succeeded()) {
                event.response()
                        .setStatusCode(HttpResponseStatus.OK.code())
                        .end(it.result().fold(JsonArray(), JsonArray::add).encode())
            } else {
                event.fail(it.cause())
            }
        })
    }

    @NotNull @Delete fun deleteTrip(event: RoutingContext) {

    }
}