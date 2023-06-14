package models

type Episode struct {
	ID            int          `json:"id" gorm:"primary_key:auto_increment"`
	Title         string       `json:"title"  gorm:"type: varchar(255)"`
	ThumbnailFilm string       `json:"thumbnail" gorm:"type: varchar(255)"`
	LinkFilm      string       `json:"link" gorm:"type: varchar(255)"`
	FilmId        int          `json:"film_id" `
	Film          FilmResponse `json:"film"`
}

type EpisodeResponse struct {
	ID            int          `json:"id" gorm:"primary_key:auto_increment"`
	Title         string       `json:"title"`
	ThumbnailFilm string       `json:"thumbnail"`
	LinkFilm      string       `json:"link"`
	Film          FilmResponse `json:"film"`
}

func (EpisodeResponse) TableName() string {
	return "episodes"
}