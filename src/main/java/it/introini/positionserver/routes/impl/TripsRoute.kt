package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.netty.handler.codec.http.HttpResponseStatus
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext

class TripsRoute @Inject constructor(val mongoClient: MongoClient): Handler<RoutingContext>{

    override fun handle(event: RoutingContext) {
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

}