package it.introini.positionserver.routes

import com.google.inject.Inject
import com.google.inject.Injector
import com.google.inject.Singleton
import io.vertx.core.http.HttpHeaders
import io.vertx.core.http.HttpMethod
import io.vertx.ext.web.Router
import io.vertx.ext.web.handler.BodyHandler
import io.vertx.ext.web.handler.StaticHandler
import io.vertx.ext.web.impl.Utils
import it.introini.positionserver.app.ENVIRONMENT
import it.introini.positionserver.app.getEnv
import org.pmw.tinylog.Logger

@Singleton
@JvmSuppressWildcards
class RoutesManager @Inject constructor(val router: Router,
                                        val injector: Injector,
                                        val routeClasses: Collection<Class<*>>) {

    companion object {
        val STATIC_PATH = "static"

        const val BASE                  = "ps"
        const val TRIPS_ROUTE           = "/$BASE/trips"
        const val POSITIONS_ROUTE       = "/$BASE/positions"
    }

    fun wireRoutes() {
        Logger.info("Wiring routes")
        val env = getEnv()
        router.route("/$BASE/$STATIC_PATH/*").handler(StaticHandler.create(STATIC_PATH).setCachingEnabled(env == ENVIRONMENT.PROD))
        router.route("/$BASE/*").handler(BodyHandler.create())
        routeClasses.forEach { clazz ->
            val handler = injector.getInstance(clazz)
            val endpoint = clazz.getAnnotation(Endpoint::class.java).endpoint
            Logger.info("Found handler class ${clazz.simpleName} with serving endpoint $endpoint")
            HttpMethods.values().forEach { httpMethod ->
                val method = clazz.methods.filter { it.isAnnotationPresent(httpMethod.annotationClass) }.singleOrNull()
                Logger.info("Binding method ${method?.name} to http method ${httpMethod.name}")
                router.route(HttpMethod.valueOf(httpMethod.name), endpoint)
                      .blockingHandler { event ->
                          if (method == null) {
                              event.response().end("Method not allowed!")
                          } else {
                              if (env == ENVIRONMENT.PROD) {
                                  event.response().putHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://188.213.170.42/")
                              }
                              method.invoke(handler,event)
                          }
                      }
            }
        }
        router.route("/$BASE").blockingHandler {
            val index = Utils.readResourceToBuffer("index.html")
            it.response()
              .putHeader(HttpHeaders.CONTENT_TYPE, "text/html")
              .end(index)
        }
    }

}
