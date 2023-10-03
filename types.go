package main

import (
	// UUID is a library for generating unique IDs
	"github.com/google/uuid"
)

type Account struct {
	ID        string `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

type Index struct {
	Title string `json:"title"`
}

func NewAccount(firstName, lastName, email string) *Account {
	return &Account{
		ID:        uuid.New().String(),
		FirstName: firstName,
		LastName:  lastName,
		Email:     email,
	}
}
