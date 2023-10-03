package main

// Handle database operations with MariaDB SQL database

import (
	"database/sql"
	"log"
	"os"

	// UUID is a library for generating unique IDs
	"github.com/google/uuid"
	_ "github.com/lib/pq"
)

// Connect to the database
func connect() *sql.DB {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	return db
}

// Create a new account
func createAccount(account Account) Account {
	db := connect()
	defer db.Close()

	// Generate a new UUID for the account
	account.ID = uuid.New().String()

	// Insert the account into the database
	_, err := db.Exec("INSERT INTO accounts (id, first_name, last_name, email) VALUES ($1, $2, $3, $4)", account.ID, account.FirstName, account.LastName, account.Email)
	if err != nil {
		log.Fatal(err)
	}

	return account
}

// Get an account by ID
func getAccount(id string) Account {
	db := connect()
	defer db.Close()

	var account Account
	err := db.QueryRow("SELECT id, first_name, last_name, email FROM accounts WHERE id = $1", id).Scan(&account.ID, &account.FirstName, &account.LastName, &account.Email)
	if err != nil {
		log.Fatal(err)
	}

	return account
}

// Get all accounts
func getAccounts() []Account {
	db := connect()
	defer db.Close()

	rows, err := db.Query("SELECT id, first_name, last_name, email FROM accounts")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var accounts []Account
	for rows.Next() {
		var account Account
		err := rows.Scan(&account.ID, &account.FirstName, &account.LastName, &account.Email)
		if err != nil {
			log.Fatal(err)
		}
		accounts = append(accounts, account)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}

	return accounts
}

// Update an account
func updateAccount(id string, account Account) Account {
	db := connect()
	defer db.Close()

	// Update the account in the database
	_, err := db.Exec("UPDATE accounts SET first_name = $1, last_name = $2, email = $3 WHERE id = $4", account.FirstName, account.LastName, account.Email, id)
	if err != nil {
		log.Fatal(err)
	}

	return account
}

// Delete an account
func deleteAccount(id string) {
	db := connect()
	defer db.Close()

	// Delete the account from the database
	_, err := db.Exec("DELETE FROM accounts WHERE id = $1", id)
	if err != nil {
		log.Fatal(err)
	}
}
