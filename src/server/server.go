// Path: src/server/server.go

package server

import (
	"log"
	"net/http"

	routes "api/src/routes"

	"github.com/gorilla/mux"
)

var routes_active = false

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
	router := mux.NewRouter()

	// Get all the routes
	allRoutes := routes.Routes

	for _, route := range allRoutes {
		// For each route, get the methods
		for _, method := range route.Methods {
			// For each method, add the route to the router
			if !routes_active {
				log.Println("Adding route", route.Pattern, "with method", method.Name)
				// Create a json entry with information about the route
				json := `{"name": "` + route.Name + `", "pattern": "` + route.Pattern + `", "method": "`
				// Loop through the methods and add them to the json entry
				for _, method := range route.Methods {
					json += `[` + method.Name + `], `
				}
				// Strip the last comma and space from the json entry
				json = json[:len(json)-2]
				// Add the rest of the json entry
				json += `", "description": "` + route.Description + `"}`
				// Add the route to the router and return the json entry as the handler
				router.HandleFunc(route.Pattern, func(w http.ResponseWriter, r *http.Request) {
					w.Header().Set("Content-Type", "application/json")
					w.Write([]byte(json))
				}).Methods(method.Name)
			} else {
				router.HandleFunc(route.Pattern, method.HandlerFunc).Methods(method.Name)
			}
		}
	}

	// Start the server
	log.Println("Starting server on", s.listenAddr)
	return http.ListenAndServe(s.listenAddr, router)
}
