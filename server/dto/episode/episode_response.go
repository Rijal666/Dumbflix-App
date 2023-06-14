package episodedto

import "dumbflix/models"

type EpisodeResponse struct {
	ID            int    `json:"id"`
	Title         string `json:"title"`
	ThumbnailFilm string `json:"thumbnail"`
	LinkFilm string `json:"link"`
	FilmId    int    `json:"film_id"`
	Film      models.FilmResponse `json:"film"`
}