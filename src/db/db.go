package db

// Handle database operations with MariaDB SQL database

import (
	"database/sql"
	"log"
	"os"

	// UUID is a library for generating unique IDs
	_ "github.com/lib/pq"
)

func Connect() *sql.DB {
	// Get the database URL from the environment
	dbURL := os.Getenv("DATABASE_URL")

	// Connect to the database
	db, err := sql.Open("mariaDB", dbURL)
	if err != nil {
		log.Fatal(err)
	}

	// Return the database connection
	return db
}

func Query(db *sql.DB, query string, args ...interface{}) *sql.Rows {
	// Query the database
	rows, err := db.Query(query, args...)
	if err != nil {
		log.Fatal(err)
	}
	// Return the rows
	return rows
}

func Prepare(db *sql.DB, query string) *sql.Stmt {
	// Prepare the statement
	stmt, err := db.Prepare(query)
	if err != nil {
		log.Fatal(err)
	}

	// Return the statement
	return stmt
}

func Exec(stmt *sql.Stmt, args ...interface{}) {
	// Execute the statement
	_, err := stmt.Exec(args...)
	if err != nil {
		log.Fatal(err)
	}
}
