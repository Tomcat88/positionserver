package it.introini.positionserver.app

import com.google.inject.Inject
import com.google.inject.Singleton
import io.vertx.core.Future
import io.vertx.core.Vertx
import io.vertx.ext.web.Router
import it.introini.positionserver.routes.RoutesManager
import org.jetbrains.annotations.NotNull
import org.pmw.tinylog.Logger

@Singleton class App @Inject constructor(val routes : RoutesManager,
                                         val vertx: Vertx,
                                         val router: Router) {

    @NotNull
    fun init(startFuture : Future<Void>) {
        Logger.info("init!")
        val httpServer = vertx.createHttpServer()
        httpServer.requestHandler{ router.accept(it) }
                  .listen(8081) {
                      if (it.succeeded()) {
                          routes.wireRoutes()
                          startFuture.complete()
                          Logger.info("Startup completed! listening on port 8081")
                      } else {
                          Logger.error("Something went wrong ${it.cause().message}",it.cause())
                          startFuture.fail(it.cause())
                      }
                  }
    }
}
