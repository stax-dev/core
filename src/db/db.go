// Path: src/db/db.go

package db

// Handle database operations with MariaDB SQL database
import (
	"database/sql"

	// UUID is a library for generating unique IDs
	"time"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/lib/pq"
)

func Connect() (*sql.DB, error) {
	db, err := sql.Open("mysql", "user:password@/dbname")
	if err != nil {
		return nil, err
	}

	db.SetMaxIdleConns(100)
	db.SetMaxOpenConns(10000)
	db.SetConnMaxLifetime(time.Minute * 3)

	return db, nil
}

func EasyConnect() *sql.DB {
	db, err := sql.Open("mysql", "user:password@/dbname")
	if err != nil {
		panic(err)
	}

	db.SetMaxIdleConns(100)
	db.SetMaxOpenConns(10000)
	db.SetConnMaxLifetime(time.Minute * 3)

	return db
}

func Query(db *sql.DB, query string) *sql.Rows {
	rows, err := db.Query(query)
	if err != nil {
		panic(err)
	}

	return rows
}

func QueryRow(db *sql.DB, query string) *sql.Row {
	row := db.QueryRow(query)

	return row
}

func Exec(db *sql.DB, query string) sql.Result {
	result, err := db.Exec(query)
	if err != nil {
		panic(err)
	}

	return result
}

func Prepare(db *sql.DB, query string) *sql.Stmt {
	stmt, err := db.Prepare(query)
	if err != nil {
		panic(err)
	}

	return stmt
}

func Close(db *sql.DB) {
	db.Close()
}
