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
	Status   string `json:"status" gorm:"type: varchar(255)"`
	Image    string `json:"image" form:"image" gorm:"type: varchar(255)"`
}

type UserResponses struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Gender   string `json:"gender"`
	Address  string `json:"address"`
	Status   string `json:"status"`
}

func (UserResponses) TableName() string {
	return "users"
}
