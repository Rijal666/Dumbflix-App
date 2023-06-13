package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type FilmRepository interface {
	FindFilms() ([]models.Film, error)
	GetFilm(ID int) (models.Film, error)
	CreateFilm(film models.Film) (models.Film, error)
}

func RepositoryFilm(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindFilms() ([]models.Film, error) {
	var films []models.Film
	err := r.db.Find(&films).Error

	return films, err
}
func (r *repository) GetFilm(ID int) (models.Film, error) {
	var film models.Film
	err := r.db.First(&film, ID).Error

	return film, err
}
func (r *repository) CreateFilm(film models.Film) (models.Film, error) {
	err := r.db.Create(&film).Error

	return film, err
}

