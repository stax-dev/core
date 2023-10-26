package main

import (
	"api/src/server"
	"log"
	"os"
)

func main() {
	// Get the port from the env file
	port := os.Getenv("PORT")

	// If the port is empty, set it to 8080
	if port == "" {
		port = "8080"
	}

	// Create a new server
	s := server.NewServer("localhost:"+port, port)

	// Start the server
	log.Fatal(s.Start())
}
