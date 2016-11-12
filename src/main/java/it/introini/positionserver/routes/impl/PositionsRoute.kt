package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.netty.handler.codec.http.HttpResponseStatus
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import it.introini.positionserver.routes.*
import org.jetbrains.annotations.NotNull
import org.pmw.tinylog.Logger
import java.time.Instant

@Endpoint(RoutesManager.POSITIONS_ROUTE)
class PositionsRoute @Inject constructor(val mongoClient: MongoClient) {

    @NotNull @Get fun getPositions(context: RoutingContext) {
        val tripId = context.request().getParam("trip")
        if (tripId == null) {
            context.fail(400)
        } else {
            mongoClient.find("positions", JsonObject().put("trip", tripId), {
                if (it.succeeded()) {
                    context.response().setStatusCode(HttpResponseStatus.OK.code()).end(it.result().fold(JsonArray(), JsonArray::add).encode())
                } else {
                    context.fail(it.cause())
                }
            })
        }
    }

    @NotNull @Put fun handle(event: RoutingContext) {
        val doc = event.bodyAsJson
        doc.put("ts", Instant.now().toString())
        mongoClient.save("positions", doc, {
            if (it.succeeded()) {
                event.response().end(doc.put("id", it.result()).encode())
            } else {
                Logger.error(it.cause())
                event.fail(500)
            }
        })
    }


    @NotNull @Delete fun deletePosition(event: RoutingContext) {
        val id = event.request().getParam("id")

        if (id == null) {
            event.fail(400)
        } else {
            mongoClient.removeDocument("positions", JsonObject().put("_id", id), {
                if (it.succeeded()) {
                    Logger.info("position deleted.")
                    event.response().end(JsonObject().put("_id", id).encode())
                } else {
                    Logger.error(it.cause())
                    event.fail(500)
                }
            })
        }
    }

}
