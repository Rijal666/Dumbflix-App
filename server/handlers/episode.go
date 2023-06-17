package handlers

import (
	episodedto "dumbflix/dto/episode"
	resultdto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)

// var path_file = "http://localhost:5000/uploads/"

type handlerEpisode struct {
	EpisodeRepository repositories.EpisodeRepository
	FilmRepository repositories.FilmRepository
}

func HandlerEpisode(EpisodeRepository repositories.EpisodeRepository, FilmRepository repositories.FilmRepository ) *handlerEpisode {
	return &handlerEpisode{ EpisodeRepository, FilmRepository}
}

func (h *handlerEpisode) FindEpisodes(c *gin.Context){
	userLogin := c.MustGet("userLogin")
	userAdmin := userLogin.(jwt.MapClaims)["is_admin"].(bool)

	if userAdmin {
		episodes, err := h.EpisodeRepository.FindEpisodes()
		if  err != nil {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		}

		// for i, p := range films {
		// 	films[i].ThumbnailFilm = path_file + p.ThumbnailFilm
		// } 
		if len(episodes) > 0 {
			c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "Semua data berhasil ditampilan, ok nyeet", Data: episodes})
		} else {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: "Data kosong, tambah dulu nyeet"})
		}

	} else {
		c.JSON(http.StatusUnauthorized, resultdto.ErrorResult{Status: http.StatusUnauthorized, Message: "Lu bukan admin nyeet"})
		return
	}
	
}
func (h *handlerEpisode) GetEpisode(c *gin.Context){
	id, _ := strconv.Atoi(c.Param("id"))
fmt.Println(id)
	
	episode, err := h.EpisodeRepository.GetEpisode(id)
	fmt.Println(episode)
	if err != nil {
		c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			return
		}

				// episode.Thumbnailepisode = path_file + episode.Thumbnailepisode


		c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "Country data successfully obtained", Data: episode})

		} 

func (h *handlerEpisode) CreateEpisode(c *gin.Context){
	c.Header("Content-Type", "multipart/form-data")
		dataFile := c.MustGet("dataFile").(string)
	fmt.Println("this is data file", dataFile)
	filmId, _ := strconv.Atoi(c.Request.FormValue("film_id"))

		request := episodedto.CreateEpisodeRequest{
			Title: c.Request.FormValue("title"),
			ThumbnailFilm: dataFile,
			LinkFilm: c.Request.FormValue("link"),
			FilmId: filmId,
		}


		validation := validator.New()
		err := validation.Struct(request)

		if err != nil {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			return
		}

		// var ctx = context.Background()
		// var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		// var API_KEY = os.Getenv("API_KEY")
		// var API_SECRET = os.Getenv("API_SECRET")
			
		// // Add your Cloudinary credentials ...
		// cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	
		// // Upload file to Cloudinary ...
		// resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "uploads"})
	
		// if err != nil {
		// 	fmt.Println(err.Error())
		// }

		// filmID, err := h.FilmRepository.GetFilm(request.FilmId)
		// 	if err != nil {
		// 		c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
		// 			Status:  http.StatusInternalServerError,
		// 			Message: err.Error(),
		// 		})
		// 		fmt.Println("error 1")
		// 	}	

		episode := models.Episode{
			Title: request.Title,
			ThumbnailFilm: request.ThumbnailFilm,
			LinkFilm: request.LinkFilm,
			FilmId: request.FilmId,
			// Film: ConvertFilmResponse(filmID),
		}

		data, err := h.EpisodeRepository.CreateEpisode(episode)

		if err != nil {
			c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
			return
		}

		c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "data udah nambah nyeet",Data: convertResponseEpisode(data)})
		return
}

func convertResponseEpisode(episode models.Episode) episodedto.EpisodeResponse{
	return episodedto.EpisodeResponse{
		ID: episode.ID,
		Title: episode.Title,
		ThumbnailFilm: episode.ThumbnailFilm,
		LinkFilm: episode.LinkFilm,
		FilmId: episode.FilmId,
		// Film: episode.Film,
		
	}
}

func ConvertFilmResponse(c models.Film) models.FilmResponse {
	return models.FilmResponse{
		ID: c.ID,
		Title: c.Title,
		ThumbnailFilm: c.ThumbnailFilm,
		Year: c.Year,
		CategoryId: c.CategoryId,
		Category: c.Category,
		Description: c.Description,
	}
}
