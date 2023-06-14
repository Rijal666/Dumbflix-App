package filmdto

import "dumbflix/models"

type CreateFilmRequest struct {
	// ID            int    `json:"id" `
	Title         string                  `json:"title" form:"title" `
	ThumbnailFilm string                  `json:"thumbnail" form:"thumbnail" `
	Year          int                     `json:"year" form:"year" `
	CategoryId    int                     `json:"category_id" form:"category_id"`
	Category      models.CategoryResponse `json:"category"`
	Description   string                  `json:"description" form:"description" `
}