package models

type Film struct {
	ID            int              `json:"id" gorm:"type: int" `
	Title         string           `json:"title" form:"title" gorm:"type: varchar(255)" `
	ThumbnailFilm string           `json:"thumbnail" form:"thumbnail" gorm:"type: varchar(255)" `
	Year          int              `json:"year" form:"year" gorm:"type: int" `
	CategoryId    int              `json:"category_id"`
	Category      CategoryResponse `json:"category"`
	Description   string           `json:"description" form:"description" gorm:"type: varchar(255)" `
	EpisodeId     int              `json:"episode_id"`
	Episode       []Episode        `json:"episode"`
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