package main

import (
	"dumbflix/migration"
	"dumbflix/pkg/mysql"
	routes "dumbflix/routes"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)


func main() {
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}	

	mysql.AutoMigrate()
	
	migration.RunAutoMigrate()
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "PATCH", "POST", "DELETE"},
		AllowHeaders: []string{"x-Requested-width", "Content-Type", "Authorization"},
	}))

	routes.RouteInit(r.Group("/api/v1"))

	r.Static("/uploads", "./uploads")

	r.Use(gin.Logger())

	var PORT = os.Getenv("PORT")

	fmt.Println("Server running localhost:" + PORT)
	
	r.Run(":" + PORT)

	// fmt.Println("Server Started")
	// http.ListenAndServe("localhost:5000", r)
}
