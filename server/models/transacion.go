package models

import "time"

type Transaction struct {
	ID        int `json:"id"`
	StartDate time.Time `json:"startdate"`
	DueDate time.Time `json:"duedate"`
	UserId int `json:"user_id"`
	User UserResponses `json:"user"`
	Status string `json:"status" gorm:"type: varchar(20)"`
	Price int `json:"price" gorm:"type: int"`
}

type TransactionResponse struct {
	ID        int                  `json:"id"`
	StartDate time.Time            `json:"startdate"`
	DueDate   time.Time            `json:"duedate"`
	UserID    int                  `json:"user_id"`
	User      UserResponses `json:"user"`
	Status    string               `json:"status"`
	Price     int                  `json:"price"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}