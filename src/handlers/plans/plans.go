// Path: src/handlers/plans/plans.go

package plans

// This file contains the implementation of handlers for plans.
// It imports necessary packages for handling HTTP requests, database operations, and defining types.
// It also imports the uuid package from Google for generating unique identifiers.
import (
	"net/http"

	"api/src/db"
	handle "api/src/handlers"
	"api/src/types"

	"github.com/google/uuid"
)

// GetPlans is a function that handles HTTP requests to retrieve plans.
// It uses the MakeHandler function to handle the request and returns a json response of all plans, and plan information.
func GetPlans(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get all plans from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}

		defer dbConn.Close()
		handle.ReturnJSON(w, db.Query(dbConn, "SELECT * FROM plans"))
	})(w, r)
}

func CreatePlan(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the plan info
		name := r.FormValue("name")
		ownerID := r.FormValue("ownerID")
		walletID := r.FormValue("walletID")
		currency := r.FormValue("currency")
		frequency := r.FormValue("frequency")
		amount := r.FormValue("amount")

		// Create the plan
		plan := NewPlan(name, ownerID, walletID, currency, frequency, amount)

		// Return the plan
		handle.ReturnJSON(w, plan)
	})(w, r)
}

func GetPlan(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the plan ID
		id := r.FormValue("id")

		// Get the plan from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		defer dbConn.Close()
		handle.ReturnJSON(w, dbConn.QueryRow("SELECT * FROM plans WHERE id = ?", id))
	})(w, r)
}

func UpdatePlan(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the plan ID
		id := r.FormValue("id")

		// Get the plan from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		stmt, err := dbConn.Prepare("UPDATE plans SET name = ?, owner_id = ?, linked_wallet_id = ?, currency = ?, frequency = ?, amount = ? WHERE id = ?")

		// Update the plan in the database
		_, err = stmt.Exec(r.FormValue("name"), r.FormValue("ownerID"), r.FormValue("walletID"), r.FormValue("currency"), r.FormValue("frequency"), r.FormValue("amount"), id)
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		defer stmt.Close()

		// Return the plan
		handle.ReturnJSON(w, dbConn.QueryRow("SELECT * FROM plans WHERE id = ?", id))
	})(w, r)
}

func DeletePlan(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the plan ID
		id := r.FormValue("id")

		// Delete the plan from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		stmt, err := dbConn.Prepare("DELETE FROM plans WHERE id = ?")
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		defer stmt.Close()
		_, err = stmt.Exec(id)
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}

		// Return OK
		handle.ReturnOK(w)
	})(w, r)
}

func NewPlan(name string, ownerID string, walletID string, currency string, frequency string, amount string) types.Plan {
	// Create the plan
	dbConn, err := db.Connect()
	if err != nil {
		// handle the error here, e.g. return an error response to the client
	}

	plan := types.Plan{
		ID:             uuid.New().String(),
		Name:           name,
		OwnerID:        ownerID,
		LinkedWalletID: walletID,
		Currency:       currency,
		Frequency:      frequency,
		Amount:         amount,
	}

	// Insert the plan into the database
	dbConn, err = db.Connect()
	if err != nil {
		// handle the error here, e.g. return an error response to the client
	}
	stmt, err := dbConn.Prepare("INSERT INTO plans (id, name, owner_id, linked_wallet_id, currency, frequency, amount) VALUES (?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		// handle the error here, e.g. return an error response to the client
	}
	defer stmt.Close()
	_, err = stmt.Exec(plan.ID, plan.Name, plan.OwnerID, plan.LinkedWalletID, plan.Currency, plan.Frequency, plan.Amount)
	if err != nil {
		// handle the error here, e.g. return an error response to the client
	}

	// Return the plan
	return plan
}
