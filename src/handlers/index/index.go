// Path: src/handlers/index/index.go

package index

import (
	"net/http"

	handle "api/src/handlers"
)

// HandleIndex handles the index route and returns API information.
func HandleIndex(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Return API information
		handle.ReturnJSON(w, []uint8(`{"name": "API", "version": "0.0.1", "author": "Stax", "Route:": "/", "Description": "This is the index route.", "methods": ["GET", "POST"]}`))
	})(w, r)
}
