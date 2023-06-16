package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gin-gonic/gin"
)

func FilmRoutes(r *gin.RouterGroup) {
	filmRepository := repositories.RepositoryFilm(mysql.DB)
	categoryRepository := repositories.RepositoryCategory(mysql.DB)
	h := handlers.HandlerFilm(filmRepository, categoryRepository)

	r.GET("/films", h.FindFilms)
	r.GET("/film/:id", h.GetFilm)
	r.POST("/film", middleware.Auth(middleware.UploadFile(h.CreateFilm)))
}