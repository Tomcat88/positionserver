package it.introini.positionserver.routes

import io.vertx.core.Handler
import io.vertx.core.http.HttpHeaders
import io.vertx.ext.web.RoutingContext
import org.jetbrains.annotations.NotNull

abstract class AbstractRoute : Handler<RoutingContext> {

    @NotNull
    override fun handle(event: RoutingContext) {
        val html ="""
        <html>
        <head><title>Titolone</title></head>
        <body><h1>Ciaone</h1><p>sotto paragrafo!</p></body>
        </html>
        """.trimMargin()

        event.response()
             .setStatusCode(200)
             .putHeader(HttpHeaders.CONTENT_TYPE, "text/html")
             .end(html)
    }
}