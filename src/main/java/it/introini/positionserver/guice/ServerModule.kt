package it.introini.positionserver.guice

import com.google.inject.AbstractModule
import com.google.inject.Inject
import com.google.inject.Provides
import com.google.inject.Singleton
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.ext.mongo.MongoClient
import io.vertx.ext.web.Router
import it.introini.positionserver.routes.Endpoint
import org.reflections.Reflections
import java.lang.reflect.Modifier

class ServerModule : AbstractModule() {

    override fun configure() {
    }

    @Provides @Singleton fun vertx() = Vertx.currentContext().owner()
    @Provides @Singleton @Inject fun router(vertx: Vertx) = Router.router(vertx)
    @Provides @Singleton @Inject fun mongoClient(vertx: Vertx) = MongoClient.createShared(vertx,
                                                                                          JsonObject()
                                                                                            .put("db_name", "position_server")
                                                                                            .put("connection_string","mongodb://localhost:27017")
                                                                 )

    @Provides fun reflections() = Reflections("it.introini.positionserver")

    @Provides
    @Singleton
    @JvmSuppressWildcards
    fun routes(reflections: Reflections): Collection<Class<*>> {
        return reflections.getTypesAnnotatedWith(Endpoint::class.java).filter { !Modifier.isAbstract(it.modifiers) }
    }

}