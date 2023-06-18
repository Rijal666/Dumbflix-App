package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/gin-gonic/gin"
)

func TransactionRoutes(r *gin.RouterGroup) {
	TransactionRepository := repositories.RepositoryTransaction(mysql.DB)
	UserRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerTransaction( TransactionRepository, UserRepository)

	r.GET("/transactions", middleware.Auth(h.FindTransactions))
	r.GET("/transaction/:id", h.GetTransaction)
	r.POST("/transaction", middleware.Auth(h.CreateTransaction))
	r.POST("/notification", h.Notification)
}