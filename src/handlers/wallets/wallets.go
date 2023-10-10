package wallets

import (
	"net/http"

	"api/src/db"
	handle "api/src/handlers"
	"api/src/types"

	"github.com/google/uuid"
)

func GetWallets(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		handle.ReturnOK(w)
	})(w, r)
}

func CreateWallet(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the wallet info
		linkedUserID := r.FormValue("linkedUserID")

		// Create the wallet
		wallet := NewWallet(linkedUserID)

		// Return the wallet
		handle.ReturnJSON(w, wallet)
	})(w, r)
}

func GetWallet(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the wallet ID
		id := r.FormValue("id")

		// Get the wallet from the database
		handle.ReturnJSON(w, db.Query(db.Connect(), "SELECT * FROM wallets WHERE id = ?", id))
	})(w, r)
}

func UpdateWallet(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the wallet ID
		id := r.FormValue("id")

		// Get the wallet from the database
		handle.ReturnJSON(w, db.Query(db.Connect(), "SELECT * FROM wallets WHERE id = ?", id))
	})(w, r)
}

func DeleteWallet(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the wallet ID
		id := r.FormValue("id")

		// Delete the wallet from the database
		db.Exec(db.Prepare(db.Connect(), "DELETE FROM wallets WHERE id = ?"), id)

		// Return OK
		handle.ReturnOK(w)
	})(w, r)
}

func NewWallet(linkedUserID string) types.Wallet {
	return types.Wallet{
		WalletID:           uuid.NewString(),
		LinkedUserID:       linkedUserID,
		UserBalance:        0,
		TransactionHistory: "",
		AddressList:        "",
		PaymentList:        "",
	}
}
