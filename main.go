// Path: main.go

package main

import (
	"api/src/server"
	"log"
	"os"

	dotenv "github.com/joho/godotenv"
)

func main() {
	// Load the .env file
	err := dotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	if err == nil {
		log.Println("Loaded .env file")
	}

	// Get the port from the env file
	port := os.Getenv("SDS_API_PORT")
	host := os.Getenv("SDS_API_HOST")

	// If the port is empty, set it to 8080
	if port == "" {
		port = "8080"
	}

	if host == "" {
		host = "127.0.0.1"
	}

	// Create a new server
	s := server.NewServer(host+":"+port, port)

	// Start the server
	log.Fatal(s.Start())
}
