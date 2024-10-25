package models

type User struct {
	ID       int    `json:"id"` // Why we do it? (`json:"id"`)
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
