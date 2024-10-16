package main

import (
    "log"
    "net/http"

    "github.com/gorilla/mux"
    "LookCookBookAPI/controllers"
)

func main() {
    r := mux.NewRouter()

    // Auth routes
    r.HandleFunc("/api/login", controllers.Login).Methods("POST")

    // Recipe routes (protected)
    r.HandleFunc("/api/recipes", controllers.CreateRecipe).Methods("POST")
    r.HandleFunc("/api/recipes", controllers.GetRecipes).Methods("GET")

    // Start server
    log.Println("Server starting on :8080")
    if err := http.ListenAndServe(":8080", r); err != nil {
        log.Fatal(err)
    }
}