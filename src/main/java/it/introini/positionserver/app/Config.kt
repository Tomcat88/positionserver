package it.introini.positionserver.app

import io.vertx.core.Vertx

fun getConfigString(parameter: PARAMETER): String = Vertx.currentContext().config().getString(parameter.name) ?: parameter.default
fun getConfigInt(parameter: PARAMETER):    Int    = Vertx.currentContext().config().getInteger(parameter.name) ?: parameter.default.toInt()

enum class PARAMETER(val default: String) {
    PORT("8081"),
    LOG_FILE("./position_server.log")
}