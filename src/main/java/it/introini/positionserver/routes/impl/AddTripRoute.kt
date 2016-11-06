package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.vertx.core.Handler
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import org.pmw.tinylog.Logger
import java.time.Instant

class AddTripRoute @Inject constructor(val mongoClient: MongoClient): Handler<RoutingContext>{

    override fun handle(event: RoutingContext) {
        val doc = event.bodyAsJson
        doc.put("ts", Instant.now().toString())
        mongoClient.insert("trips", doc, {
            if (it.succeeded()) {
                event.response().end(doc.encode());
            } else {
                Logger.error(it.cause())
                event.fail(it.cause())
            }
        })
    }
}