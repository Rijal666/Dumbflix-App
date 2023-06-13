package handlers

import (
	categorydto "dumbflix/dto/category"
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

type handlerCategory struct {
	CategoryRepository repositories.CategoryRepository
}

func HandlerCategory(CategoryRepository repositories.CategoryRepository) *handlerCategory {
	return &handlerCategory{CategoryRepository}
}

func (h *handlerCategory) FindCategories(c *gin.Context){
	userLogin := c.MustGet("userLogin")
	userAdmin := userLogin.(jwt.MapClaims)["is_admin"].(bool)

	if userAdmin {
		categories, err := h.CategoryRepository.FindCategories()
		if  err != nil {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		}
		if len(categories) > 0 {
			c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "Semua data berhasil ditampilan, ok nyeet", Data: categories})
		} else {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: "Data kosong, tambah dulu nyeet"})
		}

	} else {
		c.JSON(http.StatusUnauthorized, resultdto.ErrorResult{Status: http.StatusUnauthorized, Message: "Lu bukan admin nyeet"})
		return
	}
	
}
func (h *handlerCategory) GetCategory(c *gin.Context){
	id, _ := strconv.Atoi(c.Param("id"))
fmt.Println(id)
	
	category, err := h.CategoryRepository.GetCategory(id)
	fmt.Println(category)
	if err != nil {
		c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			return
		}
		c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "Country data successfully obtained", Data: category})

		} 

func (h *handlerCategory) CreateCategory(c *gin.Context){
	userLogin := c.MustGet("userLogin")
	userAdmin := userLogin.(jwt.MapClaims)["is_admin"].(bool)

	if userAdmin {
		request := new(categorydto.CreateCategoryRequest)
		if err := c.Bind(request); err != nil {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			return
		}

		validation := validator.New()
		err := validation.Struct(request)

		if err != nil {
			c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			return
		}

		category := models.Category{
			Name: request.Name,
		}

		data, err := h.CategoryRepository.CreateCategory(category)

		if err != nil {
			c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
			return
		}

		c.JSON(http.StatusOK, resultdto.SuccessResult{Status: http.StatusOK, Message: "data udah nambah nyeet",Data: convertResponseCategory(data)})
		return

		} else {
			c.JSON(http.StatusUnauthorized, resultdto.ErrorResult{Status: http.StatusUnauthorized, Message: "Lu bukan admin nyeet"})
			return
		}
}

func convertResponseCategory(category models.Category) categorydto.CategoryResponse{
	return categorydto.CategoryResponse{
		ID: category.ID,
		Name: category.Name,
	}
}