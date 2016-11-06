package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.vertx.core.Handler
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import org.jetbrains.annotations.NotNull
import org.pmw.tinylog.Logger
import java.time.Instant

class AddPositionRoute @Inject constructor(val mongoClient: MongoClient): Handler<RoutingContext> {

    @NotNull override fun handle(event: RoutingContext) {
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
}