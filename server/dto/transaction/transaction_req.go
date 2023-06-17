package transactiondto

import (
	"dumbflix/models"
	"time"
)

type TransactionRequest struct {
	ID        int                         `json:"id" gorm:"primary_key:auto_increment"`
	StartDate time.Time                   `json:"startdate" `
	DueDate   time.Time                   `json:"duedate" `
	Status    string                      `json:"status"`
	Price int `json:"price" form:"price" validate:"required"`
	UserId     int         `json:"user_id"`
	User       models.UserResponses `json:"user"`
}
