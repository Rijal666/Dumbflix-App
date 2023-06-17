package episodedto

type CreateEpisodeRequest struct {
	ID            int    `json:"id" `
	Title         string `json:"title" form:"title" validate:"required"`
	ThumbnailFilm string `json:"thumbnail" form:"thumbnail" validate:"required"`
	LinkFilm      string `json:"link" form:"link" validate:"required"`
	FilmId        int    `json:"film_id" form:"film_id"`
}