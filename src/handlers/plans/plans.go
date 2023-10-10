package plans

import (
	"net/http"

	"api/src/db"
	handle "api/src/handlers"
	"api/src/types"

	"github.com/google/uuid"
)

func GetPlans(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		handle.ReturnOK(w)
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
		handle.ReturnJSON(w, db.Query(db.Connect(), "SELECT * FROM plans WHERE id = ?", id))
	})(w, r)
}

func UpdatePlan(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the plan ID
		id := r.FormValue("id")

		// Get the plan from the database
		handle.ReturnJSON(w, db.Query(db.Connect(), "SELECT * FROM plans WHERE id = ?", id))
	})(w, r)
}

func DeletePlan(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the plan ID
		id := r.FormValue("id")

		// Delete the plan from the database
		db.Exec(db.Prepare(db.Connect(), "DELETE FROM plans WHERE id = ?"), id)

		// Return OK
		handle.ReturnOK(w)
	})(w, r)
}

func NewPlan(name string, ownerID string, walletID string, currency string, frequency string, amount string) types.Plan {
	// Create the plan
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
	db.Exec(db.Prepare(db.Connect(), "INSERT INTO plans VALUES (?, ?, ?, ?, ?, ?, ?)"), plan.ID, plan.Name, plan.OwnerID, plan.LinkedWalletID, plan.Currency, plan.Frequency, plan.Amount)

	// Return the plan
	return plan
}
