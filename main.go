package main

import (
    "github.com/gorilla/mux"
    "net/http"
)

func main() {
    router := mux.NewRouter()

    router.Handle("/", http.FileServer(http.Dir("./views/")))

    router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

    http.ListenAndServe(":8080", router)
}
