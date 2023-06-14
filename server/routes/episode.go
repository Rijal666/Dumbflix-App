package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gin-gonic/gin"
)

func EpisodeRoutes(r *gin.RouterGroup) {
	EpisodeRepository := repositories.RepositoryEpisode(mysql.DB)
	filmRepository := repositories.RepositoryFilm(mysql.DB)
	h := handlers.HandlerEpisode( EpisodeRepository, filmRepository)

	r.GET("/episodes", middleware.Auth(h.FindEpisodes))
	r.GET("/episode/:id", h.GetEpisode)
	r.POST("/episode", middleware.Auth(middleware.UploadFile(h.CreateEpisode)))
}