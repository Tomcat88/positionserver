package it.introini.positionserver.app

import com.google.inject.Guice
import io.vertx.core.AbstractVerticle
import io.vertx.core.Future
import it.introini.positionserver.guice.ServerModule
import org.jetbrains.annotations.NotNull
import org.pmw.tinylog.Configurator
import org.pmw.tinylog.Level
import org.pmw.tinylog.writers.ConsoleWriter
import org.pmw.tinylog.writers.FileWriter

class AppVerticle : AbstractVerticle() {

    @NotNull
    override fun start(startFuture: Future<Void>) {
        val injector = Guice.createInjector(ServerModule())
        val app = injector.getInstance(App::class.java)
        Configurator.defaultConfig()
                    .level(Level.INFO)
                    .writer(FileWriter("positionServer.log"))
                    .writer(ConsoleWriter())
                    .activate()
        app.init(startFuture)
    }
}
