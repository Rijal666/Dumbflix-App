package models

type Film struct {
	ID            int              `json:"id" gorm:"type: int" `
	Title         string           `json:"title" gorm:"type: varchar(255)" `
	ThumbnailFilm string           `json:"thumbnail" form:"thumbnail" gorm:"type: varchar(255)" `
	Year          int              `json:"year" gorm:"type: int" `
	CategoryId    int              `json:"category_id"`
	Category      CategoryResponse `json:"category" gorm:"foreignKey: CategoryId"`
	Description   string           `json:"description" gorm:"type: varchar(255)" `
}

type FilmResponse struct {
	ID            int              `json:"id"`
	Title         string           `json:"title"`
	ThumbnailFilm string           `json:"thumbnail"`
	Year          int              `json:"year"`
	CategoryId    int              `json:"category_id"`
	Category      CategoryResponse `json:"category"`
	Description   string           `json:"description"`
}

func (FilmResponse) TableName() string {
	return "films"
}