package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"
)

var getDrinksHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var drinks = []Drink{
		Drink{Id: 1, Percent: 5.0, Time: time.Now(), Name: "Test drink"},
	}

	payload, _ := json.Marshal(drinks)

	w.Write([]byte(payload))
})

var createDrinkHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var drink Drink
	// vars := mux.Vars(r)
	// name := vars["name"]

	// drink.Name = name

	w.Header().Set("Content-Type", "application/json")

	// payload, err := json.Marshal(drink)
	// drink = Drink{
	// 	Id:      1,
	// 	Percent: 5,
	// 	Time:    time.Now(),
	// 	Name:    "Test drink!!",
	// }
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// }

	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}
	defer db.Close()
	var lastInsertId int
	t := time.Now()
	name := r.FormValue("name")

	err = db.QueryRow("INSERT INTO drink(name, created_at) VALUES ($1, $2) returning id;", name, t).Scan(&lastInsertId)
	if err != nil {
		panic(err)
	}

	fmt.Println(drink)
	payload, _ := json.Marshal(drink)
	fmt.Println(payload)
	w.Write([]byte(payload))
})
