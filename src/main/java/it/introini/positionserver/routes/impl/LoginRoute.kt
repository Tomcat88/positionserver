package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.RoutingContext
import it.introini.positionserver.routes.Endpoint
import it.introini.positionserver.routes.Post
import it.introini.positionserver.routes.RoutesManager
import org.pmw.tinylog.Logger
import java.util.*

@Endpoint(RoutesManager.LOGIN_ROUTE)
class LoginRoute @Inject constructor(val mongoClient: MongoClient){

    val USER_PARAM = "user"
    val PASSWORD_PARAM = "password"

    @Post fun post(event: RoutingContext) {
        val req = event.bodyAsJson
        val user = req.getString(USER_PARAM)
        val pass = req.getString(PASSWORD_PARAM)

        if (user == null || pass == null) {
            event.fail(400)

        } else {
            mongoClient.findOne("users", JsonObject().put(USER_PARAM, user), JsonObject().put(PASSWORD_PARAM, "1"), {
                if (it.succeeded()) {
                    val mongoUser = it.result()
                    val mongoPass = mongoUser?.getString(PASSWORD_PARAM)
                    if (mongoPass != null) {
                        val dec = kotlin.text.String(Base64.getDecoder().decode(mongoPass))
                        if (dec == pass) {
                            val token = UUID.randomUUID().toString()
                            val tokenObj = JsonObject().put("token", token)
                            mongoClient.updateCollection("users", JsonObject().put(USER_PARAM, user), JsonObject().put("\$set", tokenObj), {
                                if (it.succeeded()) {
                                    Logger.info("updated token for user $user")
                                    event.response().end(tokenObj.encodePrettily())
                                } else {
                                    event.fail(it.cause())
                                }
                            })
                        } else {
                            event.fail(400)
                        }
                    } else {
                        event.fail(400)
                    }
                } else {
                    event.fail(it.cause())
                }
            })
        }

    }
}