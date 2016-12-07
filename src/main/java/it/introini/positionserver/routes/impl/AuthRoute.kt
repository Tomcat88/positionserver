package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.vertx.core.Handler
import io.vertx.core.http.HttpHeaders
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import org.pmw.tinylog.Logger
import java.util.*

class AuthRoute @Inject constructor(val mongoClient: MongoClient) : Handler<RoutingContext> {

    val errResponse: String = JsonObject().put("auth", -1).encode()

    override fun handle(event: RoutingContext) {
        val request = event.request()
        val auth = request.getHeader(HttpHeaders.AUTHORIZATION)
        if (auth != null) {
            val token = String(Base64.getDecoder().decode(auth)).split(":").last()
            mongoClient.findOne("users", JsonObject().put("token", token), JsonObject().put("user_id", "1"), {
                if (it.succeeded()) {
                    val id = it.result().getLong("user_id")
                    if (id != null) {
                        Logger.info("auth successfull for user $id")
                        event.put("user_id", id)
                        event.next()
                    } else {
                        Logger.error("User without id")
                        event.response().end(errResponse)
                    }
                } else {
                    Logger.error(it.cause())
                    event.response().end(errResponse)
                }
            })
        } else {
            event.response().end(errResponse)
        }
    }
}