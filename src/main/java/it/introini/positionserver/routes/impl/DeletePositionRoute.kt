package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import org.pmw.tinylog.Logger

class DeletePositionRoute @Inject constructor(val mongoClient: MongoClient): Handler<RoutingContext>{

    override fun handle(event: RoutingContext) {
        val id = event.pathParam("id")

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