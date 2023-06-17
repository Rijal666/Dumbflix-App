package filmdto

import "dumbflix/models"

type FilmResponse struct {
	ID            int    `json:"id"`
	Title         string `json:"title"`
	ThumbnailFilm string `json:"thumbnail"`
	Year          int    `json:"year"`
	CategoryId    int    `json:"category_id"`
	Category      models.CategoryResponse `json:"category"`
	Description string `json:"description"`
	TitleEpisode     string           `json:"title_episode"`
	ThumbnailEpisode string           `json:"thumbnail_episode"`
	Link             string           `json:"link_episode"`
	EpisodeId int `json:"episode_id"`
	Episode [ ]models.EpisodeResponse `json:"episode"`
}