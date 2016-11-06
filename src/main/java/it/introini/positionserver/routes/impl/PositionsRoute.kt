package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.netty.handler.codec.http.HttpResponseStatus
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import org.jetbrains.annotations.NotNull

class PositionsRoute @Inject constructor(val mongoClient: MongoClient): Handler<RoutingContext> {

    @NotNull override fun handle(context: RoutingContext) {
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

}
