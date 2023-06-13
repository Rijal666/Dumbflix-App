package routes

import "github.com/gin-gonic/gin"

func RouteInit(r *gin.RouterGroup) {
	AuthRoutes(r)
	UserRoutes(r)
	CategoryRoutes(r)
	FilmRoutes(r)
	// TripRoutes(r)
	// TransactionRoutes(r)
}