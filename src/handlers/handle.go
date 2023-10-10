package handle

import (
	"log"
	"net/http"
)

func MakeHandler(fn func(http.ResponseWriter, *http.Request)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Log the request
		log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL)

		// Call the handler
		fn(w, r)
	}
}

func ReturnOK(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the data
	w.Write([]byte(`{"status": "OK"}`))
}

func ReturnJSON(w http.ResponseWriter, data interface{}) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the data
	w.Write(data.([]byte))
}

func ReturnError(w http.ResponseWriter, err error) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "` + err.Error() + `"}`))
}

func ReturnNotFound(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Not Found"}`))
}

func ReturnUnauthorized(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Unauthorized"}`))
}

func ReturnForbidden(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Forbidden"}`))
}

func ReturnBadRequest(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Bad Request"}`))
}

func ReturnInternalServerError(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Internal Server Error"}`))
}

func ReturnServiceUnavailable(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Service Unavailable"}`))
}

func ReturnMethodNotAllowed(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Method Not Allowed"}`))
}

func ReturnNotImplemented(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Not Implemented"}`))
}

func ReturnGatewayTimeout(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Gateway Timeout"}`))
}

func ReturnHTTPVersionNotSupported(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "HTTP Version Not Supported"}`))
}

func ReturnVariantAlsoNegotiates(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error": "Variant Also Negotiates"}`))
}

func ReturnInsufficientStorage(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error":"Insufficient Storage"}`))
}

func ReturnLoopDetected(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error":"Loop Detected"}`))
}

func ReturnNotExtended(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error":"Not Extended"}`))
}

func ReturnNetworkAuthenticationRequired(w http.ResponseWriter) {
	// Set the content type
	w.Header().Set("Content-Type", "application/json")

	// Write the error
	w.Write([]byte(`{"error":"Network Authentication Required"}`))
}
