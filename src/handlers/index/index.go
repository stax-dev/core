package index

import (
	"net/http"

	handle "api/src/handlers"
)

func HandleIndex(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})(w, r)
}
