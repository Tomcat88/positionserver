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
import org.pmw.tinylog.Logger

@Singleton
@JvmSuppressWildcards
class RoutesManager @Inject constructor(val router: Router,
                                        val injector: Injector,
                                        val routeClasses: Collection<Class<*>>) {

    companion object {
        val STATIC_PATH = "static"

        const val TRIPS_ROUTE           = "/trips"
        const val POSITIONS_ROUTE       = "/positions"
    }

    fun wireRoutes() {
        Logger.info("Wiring routes")
        router.route("/$STATIC_PATH/*").handler(StaticHandler.create(STATIC_PATH).setCachingEnabled(false))
        router.route("/*").handler(BodyHandler.create())
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
                              method.invoke(handler,event)
                          }
                      }
            }
        }
        router.route("/").blockingHandler {
            val index = Utils.readResourceToBuffer("index.html")
            it.response()
              .putHeader(HttpHeaders.CONTENT_TYPE, "text/html")
              .end(index)
        }
    }

}
