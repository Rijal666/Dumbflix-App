package filmdto

import "dumbflix/models"

type FilmResponse struct {
	ID            int    `json:"id"`
	Title         string `json:"title"`
	ThumbnailFilm string `json:"thumbnail" form:"thumbnail"`
	Year          int    `json:"year"`
	CategoryId    int    `json:"category_id"`
	Category      models.CategoryResponse `json:"category"`
	Description string `json:"description"`
}