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
		err := db.Query(db.Connect(), "INSERT INTO users VA")
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		// Return the user
		handle.ReturnJSON(w, user)
	})(w, r)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get all the users from the database and return them as JSON
		handle.ReturnJSON(w, db.Query(db.Connect(), "SELECT * FROM users"))
	})(w, r)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the user ID
		id := r.FormValue("id")

		// Get the user from the database
		handle.ReturnJSON(w, db.Query(db.Connect(), "SELECT * FROM users WHERE id = ?", id))
	})(w, r)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the user ID
		id := r.FormValue("id")

		// Get the user from the database
		handle.ReturnJSON(w, db.Query(db.Connect(), "SELECT * FROM users WHERE id = ?", id))
	})(w, r)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the user ID
		id := r.FormValue("id")

		// Delete the user from the database
		db.Exec(db.Prepare(db.Connect(), "DELETE FROM users WHERE id = ?"), id)

		// Return OK
		handle.ReturnOK(w)
	})(w, r)
}
