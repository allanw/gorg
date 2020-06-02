package main

import (
    "encoding/json"
    "net/http"
    "time"
)

var getDrinksHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    var drinks = []Drink{
        Drink{Id: 1, Percent: 5.0, Time: time.Now(), Name: "Test drink"},
    }

    payload, _ := json.Marshal(drinks)

    w.Write([]byte(payload))
})
