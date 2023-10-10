package server

import (
	"log"
	"net/http"

	routes "api/src/routes"
)

// Server is the main server struct
type Server struct {
	listenAddr string
}

// NewServer creates a new server
func NewServer(listenAddr string) *Server {
	return &Server{
		listenAddr: listenAddr,
	}
}

// Start starts the server
func (s *Server) Start() error {
	router := http.NewServeMux()

	// Add the routes
	for _, route := range routes.Routes {
		router.HandleFunc(route.Pattern, route.HandlerFunc)
	}

	// Start the server
	log.Println("Starting server on", s.listenAddr)
	return http.ListenAndServe(s.listenAddr, router)
}
