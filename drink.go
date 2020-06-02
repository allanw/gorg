package main

import (
	"time"
)

type Drink struct {
	Id	int	  `json:"id"`
	Percent	float64	  `json:"percent,string"`
	Time	time.Time `json:"time"`
	Name	string	  `json:"name"`
}
