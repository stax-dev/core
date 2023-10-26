package users

import (
	"log"
	"net/http"
	"time"

	"api/src/db"
	handle "api/src/handlers"
	"api/src/types"

	"github.com/google/uuid"
)

func NewUser(firstName, lastName, email string) *types.User {
	return &types.User{
		ID:                  uuid.NewString(),
		FirstName:           firstName,
		LastName:            lastName,
		UserName:            "",
		UserAvatar:          "",
		AppTheme:            "dark",
		BannerID:            "main",
		UserRank:            "",
		JoinDate:            time.Now(),
		UserWallet:          uuid.NewString(),
		EmailList:           "[{\"email\":\"" + email + "\",\"verified\":false\",\"primary\":true\"}]",
		AddressList:         "",
		PaymentList:         "",
		DisposableCount:     0,
		DisposableActive:    false,
		PlanList:            "",
		UserStatus:          "",
		LoginActivityList:   "",
		PasswordLastChanged: time.Now(),
		TransactionHistory:  "",
		NotificationList:    "",
	}
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the user info
		firstName := r.FormValue("firstName")
		lastName := r.FormValue("lastName")
		email := r.FormValue("email")

		// Create the user
		user := NewUser(firstName, lastName, email)
		// Query the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		stmt, err := dbConn.Prepare("INSERT INTO users (id, first_name, last_name, email) VALUES (?, ?, ?, ?)")
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		_, err = stmt.Exec(user.ID, user.FirstName, user.LastName, user.Email)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer dbConn.Close()

		// Return the user
		handle.ReturnJSON(w, user)
	})(w, r)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get all the users from the database and return them as JSON
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		stmt, err := dbConn.Prepare("SELECT * FROM users")
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		rows, err := stmt.Query()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer rows.Close()
		var users []types.User
		for rows.Next() {
			var user types.User
			err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.UserName, &user.UserAvatar, &user.AppTheme, &user.BannerID, &user.UserRank, &user.JoinDate, &user.UserWallet, &user.EmailList, &user.AddressList, &user.PaymentList, &user.DisposableCount, &user.DisposableActive, &user.PlanList, &user.UserStatus, &user.LoginActivityList, &user.PasswordLastChanged, &user.TransactionHistory, &user.NotificationList)
			if err != nil {
				log.Println(err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}
			users = append(users, user)
		}
		handle.ReturnJSON(w, users)
	})(w, r)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the user ID
		id := r.FormValue("id")

		// Get the user from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		defer dbConn.Close()
		handle.ReturnJSON(w, dbConn.QueryRow("SELECT * FROM users WHERE id = ?", id))
	})(w, r)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the user ID
		id := r.FormValue("id")

		// Get the user from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		stmt, err := dbConn.Prepare("UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?")
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		_, err = stmt.Exec(r.FormValue("firstName"), r.FormValue("lastName"), r.FormValue("email"), id)
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		defer dbConn.Close()
		handle.ReturnJSON(w, dbConn.QueryRow("SELECT * FROM users WHERE id = ?", id))
	})(w, r)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the user ID
		id := r.FormValue("id")

		// Delete the user from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		stmt, err := dbConn.Prepare("DELETE FROM users WHERE id = ?")
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		_, err = stmt.Exec(id)
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		defer stmt.Close()

		// Return OK
		handle.ReturnOK(w)
	})(w, r)
}
