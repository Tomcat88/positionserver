package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.vertx.core.Handler
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import it.introini.positionserver.routes.Endpoint
import it.introini.positionserver.routes.RoutesManager
import org.pmw.tinylog.Logger
import java.time.Instant

@Endpoint(RoutesManager.ADD_POSITION_ROUTE)
class AddTripRoute @Inject constructor(val mongoClient: MongoClient): Handler<RoutingContext>{

    override fun handle(event: RoutingContext) {
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
}