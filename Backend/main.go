package main

import (
	"Backend/controllers"
	"Backend/middlewares"
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// Connect to MySQL database
	db, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/lookcookbook")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Initialize Gin router
	r := gin.Default()

	// Auth routes
	r.POST("/signup", controllers.Signup(db))
	r.POST("/signin", controllers.Signin(db))

	// Protected route
	r.GET("/protected", middlewares.JwtVerify(), controllers.Protected)

	// Start server
	r.Run(":8080")
}
