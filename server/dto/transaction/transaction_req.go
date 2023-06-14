package transactiondto

import (
	"dumbflix/models"
	"time"
)

type TransactionRequest struct {
	ID        int                         `json:"id" gorm:"primary_key:auto_increment"`
	StartDate time.Time                   `json:"startdate" form:"startdate" `
	DueDate   time.Time                   `json:"duedate" form:"duedate" `
	Status    string                      `json:"status" form:"status" validate:"required"`
	Price string `json:"price" form:"price" validate:"required"`
	UserId     int         `json:"user_id"`
	User       models.UserResponses `json:"user"`
}
