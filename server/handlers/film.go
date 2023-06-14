package handlers

import (
	"context"
	filmdto "dumbflix/dto/film"
	resultdto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)

type handlerFilm struct {
	FilmRepository repositories.FilmRepository
	CategoryRepository repositories.CategoryRepository
}

func HandlerFilm(FilmRepository repositories.FilmRepository, CategoryRepository repositories.CategoryRepository) *handlerFilm {
	return &handlerFilm{FilmRepository, CategoryRepository}
}

func (h *handlerFilm) FindFilms(c *gin.Context){
	userLogin := c.MustGet("userLogin")
	userAdmin := userLogin.(jwt.MapClaims)["is_admin"].(bool)

	if userAdmin {
		films, err := h.FilmRepository.FindFilms()
		if  err != nil {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		}
		if len(films) > 0 {
			c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "Semua data berhasil ditampilan, ok nyeet", Data: films})
		} else {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: "Data kosong, tambah dulu nyeet"})
		}

	} else {
		c.JSON(http.StatusUnauthorized, resultdto.ErrorResult{Status: http.StatusUnauthorized, Message: "Lu bukan admin nyeet"})
		return
	}
	
}
func (h *handlerFilm) GetFilm(c *gin.Context){
	id, _ := strconv.Atoi(c.Param("id"))
fmt.Println(id)
	
	film, err := h.FilmRepository.GetFilm(id)
	fmt.Println(film)
	if err != nil {
		c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			return
		}
		c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "Country data successfully obtained", Data: film})

		} 

func (h *handlerFilm) CreateFilm(c *gin.Context){
	c.Header("Content-Type", "multipart/form-data")


	userLogin := c.MustGet("userLogin")
	userAdmin := userLogin.(jwt.MapClaims)["is_admin"].(bool)

	if userAdmin {
		dataFile := c.MustGet("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	Year, _ := strconv.Atoi(c.Request.FormValue("year"))
	CategoryId, _ := strconv.Atoi(c.Request.FormValue("category_id"))

		request := filmdto.CreateFilmRequest{
			Title: c.Request.FormValue("title"),
			ThumbnailFilm: dataFile,
			Year: Year,
			CategoryId: CategoryId,
			Description: c.Request.FormValue("description"),
		}


		validation := validator.New()
		err := validation.Struct(request)

		if err != nil {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			return
		}

		var ctx = context.Background()
		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")
			
		// Add your Cloudinary credentials ...
		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	
		// Upload file to Cloudinary ...
		resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "uploads"})
	
		if err != nil {
			fmt.Println(err.Error())
		}

		categoryId, err := h.CategoryRepository.GetCategory(request.CategoryId)
			if err != nil {
				c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
					Status:  http.StatusInternalServerError,
					Message: err.Error(),
				})
				fmt.Println("error 1")
			}	

		film := models.Film{
			Title: request.Title,
			ThumbnailFilm: resp.SecureURL,
			Year: request.Year,
			CategoryId: request.CategoryId,
			Category: ConvertCategoryResponse(categoryId),
			Description: request.Description,
		}

		data, err := h.FilmRepository.CreateFilm(film)

		if err != nil {
			c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
			return
		}

		c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "data udah nambah nyeet",Data: convertResponseFilm(data)})
		return

		} else {
			c.JSON(http.StatusUnauthorized, resultdto.ErrorResult{Status: http.StatusUnauthorized, Message: "Lu bukan admin nyeet"})
			return
		}
}

func convertResponseFilm(film models.Film)filmdto.FilmResponse{
	return filmdto.FilmResponse{
		ID: film.ID,
		Title: film.Title,
		ThumbnailFilm: film.ThumbnailFilm,
		Year: film.Year,
		CategoryId: film.CategoryId,
		Category: film.Category,
		Description: film.Description,
	}
}

func ConvertCategoryResponse(c models.Category) models.CategoryResponse {
	return models.CategoryResponse{
		ID: c.ID,
		Name: c.Name,
	}
}
