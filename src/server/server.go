package server

import (
	"log"
	"net/http"

	routes "api/src/routes"
)

// Server is the main server struct
type Server struct {
	listenAddr string
	port       string
}

// NewServer creates a new server
func NewServer(listenAddr string, port string) *Server {
	return &Server{
		listenAddr: listenAddr,
		port:       port,
	}
}

// Start starts the server
func (s *Server) Start() error {
	router := http.NewServeMux()

	// Sense the method and path, and call the appropriate handler
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		for _, route := range routes.Routes {
			if route.Pattern == r.URL.Path {
				for _, method := range route.Methods {
					if method.Name == r.Method {
						method.HandlerFunc(w, r)
					}
				}
			}
		}
	})

	// Start the server
	log.Println("Starting server on", s.listenAddr)
	return http.ListenAndServe(s.listenAddr, router)
}
