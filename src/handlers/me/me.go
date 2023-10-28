package me

import (
	"api/src/db"
	"api/src/types"

	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// When the user goes to the /me/ route, the handleMe function will be called
func HandleMe(w http.ResponseWriter, r *http.Request) {
	// Get the device ID from the post request
	vars := mux.Vars(r)
	deviceID := vars["deviceID"]

	// In the database, the device ID is in the devices table, so we need to get the user ID from the devices table using the device ID
	userID := GetUserIDFromDeviceID(deviceID)

	// Get the user data from the database
	userData := GetUserData(userID)

	// Convert the user data to JSON
	userDataJSON, err := json.Marshal(userData)
	if err != nil {
		log.Fatal(err)
	}

	// Write the JSON to the response
	fmt.Fprintf(w, string(userDataJSON))
}

// When the user goes to the /me/ route with a PUT request, the updateMe function will be called
func UpdateMe(w http.ResponseWriter, r *http.Request) {
	// Get the device ID from the post request
	vars := mux.Vars(r)
	deviceID := vars["deviceID"]

	// In the database, the device ID is in the devices table, so we need to get the user ID from the devices table using the device ID
	userID := GetUserIDFromDeviceID(deviceID)

	// Get the user data from the database
	userData := GetUserData(userID)

	// Convert the user data to JSON
	userDataJSON, err := json.Marshal(userData)
	if err != nil {
		log.Fatal(err)
	}

	// Update the user data in the database
	db, nil := db.Connect()
	defer db.Close()
	_, err = db.Exec("UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4", userData.FirstName, userData.LastName, userData.Email, userData.ID)
	if err != nil {
		log.Fatal(err)
	}

	// Write the JSON to the response
	fmt.Fprintf(w, string(userDataJSON))
}

func GetUserIDFromDeviceID(deviceID string) string {
	db, nil := db.Connect()
	defer db.Close()

	// Get the user ID from the database
	var userID string
	err := db.QueryRow("SELECT user_id FROM devices WHERE id = $1", deviceID).Scan(&userID)
	if err != nil {
		log.Fatal(err)
	}

	return userID
}

func GetUserData(userID string) types.User {
	db, nil := db.Connect()
	defer db.Close()

	// Get the user data from the database
	var userData types.User
	err := db.QueryRow("SELECT id, first_name, last_name, email FROM users WHERE id = $1", userID).Scan(&userData.ID, &userData.FirstName, &userData.LastName, &userData.Email)
	if err != nil {
		log.Fatal(err)
	}

	return userData
}
