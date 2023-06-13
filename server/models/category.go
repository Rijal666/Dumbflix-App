package models

type Category struct {
	ID   int    `json:"id" `
	Name string `json:"name" gorm:"type: varchar(255)" `
}

// type CategoryResponse struct {
// 	ID   int    `json:"id"`
// 	Name string `json:"name"`
// }

// func (CategoryResponse) TableName() string {
// 	return "categories"
// }