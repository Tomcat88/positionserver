package it.introini.positionserver.routes.impl

import com.google.inject.Inject
import com.mongodb.async.client.MongoClient
import io.vertx.ext.web.RoutingContext
import it.introini.positionserver.routes.Delete


class DeleteTripRoute @Inject constructor(val mongoClient: MongoClient){

    @Delete fun delete(event: RoutingContext) {

    }
}