package categorydto

type CreateCategoryRequest struct {
	ID   int    `json:"id" `
	Name string `json:"name" gorm:"type: varchar(255)" validate:"required"`
}