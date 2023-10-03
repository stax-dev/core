package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}

type apiFunc func(w http.ResponseWriter, r *http.Request) error
type ApiError struct {
	Error string `json:"error"`
}

func makeHTTPHandler(fn apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := fn(w, r); err != nil {
			WriteJSON(w, http.StatusBadRequest, ApiError{Error: err.Error()})
		}
	}
}

type APIServer struct {
	listenAddr string
}

func NewAPIServer(listenAddr string) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
	}
}

func (s *APIServer) Start() error {
	router := mux.NewRouter()

	router.HandleFunc("/account", makeHTTPHandler(s.handleAccount))
	router.HandleFunc("/", makeHTTPHandler(s.handleIndex))

	log.Println("Starting API server on: ", s.listenAddr)

	return http.ListenAndServe(s.listenAddr, router)
}

func (s *APIServer) handleAccount(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		return s.handleGetAccount(w, r)
	}
	if r.Method == "POST" {
		return s.handleCreateAccount(w, r)
	}
	if r.Method == "DELETE" {
		return s.handleDeleteAccount(w, r)
	}

	return fmt.Errorf("unsupported method: %s", r.Method)
}

func (s *APIServer) handleGetAccount(w http.ResponseWriter, r *http.Request) error {
	account := NewAccount("John", "Doe", "johndoe@st.ax")
	return WriteJSON(w, http.StatusOK, account)
}

func (s *APIServer) handleCreateAccount(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func (s *APIServer) handleDeleteAccount(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func (s *APIServer) handleIndex(w http.ResponseWriter, r *http.Request) error {
	index := Index{
		Title: "Hello World",
	}
	err := json.NewEncoder(w).Encode(index)

	// set the content-type to html
	w.Header().Set("Content-Type", "text/html")

	// write the index title without quotes
	_, err = fmt.Fprintf(w, "%s", index.Title)

	if err != nil {
		return err
	}

	return nil
}
