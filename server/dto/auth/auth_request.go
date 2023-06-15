package authdto

type AuthRequset struct {
	IsAdmin   bool   `json:"is_admin"`
	Fullname  string `json:"fullname" validate:"required"`
	Email     string `json:"email" validate:"required"`
	Password  string `json:"password" validate:"required"`
	Gender    string `json:"gender" validate:"required"`
	Phone     string `json:"phone" validate:"required"`
	Address   string `json:"address" validate:"required"`
	Thumbnail string `json:"thumbnail"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}