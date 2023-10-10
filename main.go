package main

import (
	"api/src/server"
	"log"
	"os"
)

func main() {
	// Get the port from the environment
	port := os.Getenv("PORT")

	// Create a new server
	s := server.NewServer(":" + port)

	// Start the server
	log.Fatal(s.Start())
}
