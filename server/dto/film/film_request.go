package filmdto

type CreateFilmRequest struct {
	ID            int    `json:"id" `
	Title         string `json:"title" form:"title" validate:"required"`
	ThumbnailFilm string `json:"thumbnail" form:"thumbnail" validate:"required"`
	Year          int    `json:"year" form:"year" validate:"required"`
	CategoryId    int    `json:"category_id" form:"category_id" validate:"required"`
	Description   string `json:"description" form:"description" validate:"required"`
}