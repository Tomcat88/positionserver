package it.introini.positionserver.app

import io.vertx.core.Vertx

fun getConfigString(parameter: PARAMETER): String = Vertx.currentContext().config().getString(parameter.name) ?: parameter.default.toString()
fun getConfigInt(parameter: PARAMETER):    Int    = Vertx.currentContext().config().getInteger(parameter.name) ?: parameter.default as? Int ?: error("${parameter.default} is not an int")
fun getEnv():                              ENVIRONMENT = ENVIRONMENT.valueOf((Vertx.currentContext().config().getString(PARAMETER.ENV.name)?: PARAMETER.ENV.default.toString()).toUpperCase())


enum class PARAMETER(val default: Any) {
    ENV("dev"),
    PORT(8081),
    LOG_FILE("./position_server.log")
}

enum class ENVIRONMENT {
    DEV,
    PROD;

    override fun toString() = name
}