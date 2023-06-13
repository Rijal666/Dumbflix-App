package models

type User struct {
	ID       int    `json:"id" gorm:"primary_key:auto_increment"`
	IsAdmin  bool   `json:"is_admin" gorm:"type: bool"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Phone    string `json:"phone" gorm:"type: varchar(255)"`
	Gender   string `json:"gender" gorm:"type: varchar(255)"`
	Address  string `json:"address" gorm:"type: varchar(255)"`
	Status   bool   `json:"status" gorm:"type: bool"`
	Image    string `json:"image" gorm:"type: varchar(255)"`
}