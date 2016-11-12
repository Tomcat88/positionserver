package it.introini.positionserver.routes

annotation class Endpoint(val endpoint:String)

annotation class Get()
annotation class Post()
annotation class Delete()
annotation class Put()

enum class HttpMethods(val annotationClass: Class<out Annotation>) {
    GET(Get::class.java),
    POST(Post::class.java),
    DELETE(Delete::class.java),
    PUT(Put::class.java)
}