package migration

import (
	"dumbflix/models"
	"dumbflix/pkg/mysql"
	"fmt"
)

func RunAutoMigrate() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
	
	)
	if err != nil {
		panic(err)
	}
	fmt.Println("Success Migration")
}