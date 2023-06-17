package filmdto

type CreateFilmRequest struct {
	ID               int    `json:"id" `
	Title            string `json:"title" form:"title" validate:"required"`
	ThumbnailFilm    string `json:"thumbnail" form:"thumbnail" validate:"required"`
	Year             int    `json:"year" form:"year" validate:"required"`
	CategoryId       int    `json:"category_id" form:"category_id" validate:"required"`
	Description      string `json:"description" form:"description" validate:"required"`
	TitleEpisode     string `json:"title_episode" form:"title_episode"`
	ThumbnailEpisode string `json:"thumbnail_episode" form:"thumbnail_episode"`
	Link             string `json:"link_episode" form:"link_episode" validate:"required"`
}