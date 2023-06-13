package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gin-gonic/gin"
)

func CategoryRoutes(r *gin.RouterGroup) {
	categoryRepository := repositories.RepositoryCategory(mysql.DB)
	h := handlers.HandlerCategory(categoryRepository)

	r.GET("/categories", middleware.Auth(h.FindCategories))
	r.GET("/category/:id", h.GetCategory)
	r.POST("/category", middleware.Auth(h.CreateCategory))
}