package it.introini.positionserver.routes

import com.google.inject.Inject
import com.google.inject.Injector
import com.google.inject.Singleton
import io.vertx.core.http.HttpHeaders
import io.vertx.ext.web.Router
import io.vertx.ext.web.handler.BodyHandler
import io.vertx.ext.web.handler.StaticHandler
import io.vertx.ext.web.impl.Utils
import it.introini.positionserver.routes.impl.*
import org.pmw.tinylog.Logger

@Singleton
class RoutesManager @Inject constructor(val router: Router, val injector: Injector) {

    companion object {
        val STATIC_PATH = "static"

        const val TRIPS_ROUTE           = "/trips.json"
        const val ADD_TRIP_ROUTE        = "/trip/add"
        const val POSITIONS_ROUTE       = "/:trip/positions.json"
        const val ADD_POSITION_ROUTE    = "/position/add"
        const val DELETE_POSITION_ROUTE = "/position/delete/:id"
    }

    fun wireRoutes() {
        Logger.info("Wiring routes")
        router.route("/$STATIC_PATH/*").handler(StaticHandler.create(STATIC_PATH).setCachingEnabled(false))
        router.route("/*").handler(BodyHandler.create())
        router.get(TRIPS_ROUTE).blockingHandler(injector.getInstance(TripsRoute::class.java))
        router.post(ADD_TRIP_ROUTE).blockingHandler(injector.getInstance(AddTripRoute::class.java))
        router.get(POSITIONS_ROUTE).blockingHandler(injector.getInstance(PositionsRoute::class.java))
        router.post(ADD_POSITION_ROUTE).blockingHandler(injector.getInstance(AddPositionRoute::class.java))
        router.post(DELETE_POSITION_ROUTE).blockingHandler(injector.getInstance(DeletePositionRoute::class.java))
        router.route("/").blockingHandler {
            val index = Utils.readResourceToBuffer("index.html")
            it.response()
              .putHeader(HttpHeaders.CONTENT_TYPE, "text/html")
              .end(index)
        }
    }

}
