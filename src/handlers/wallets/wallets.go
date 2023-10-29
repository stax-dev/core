// Path: src/handlers/wallets/wallets.go

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
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		defer dbConn.Close()
		handle.ReturnJSON(w, dbConn.QueryRow("SELECT * FROM wallets WHERE id = ?", id))
	})(w, r)
}

func UpdateWallet(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the wallet ID
		id := r.FormValue("id")

		// Get the wallet from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		stmt, err := dbConn.Prepare("UPDATE wallets SET user_balance = ?, transaction_history = ?, address_list = ?, payment_list = ? WHERE id = ?")
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		_, err = stmt.Exec(r.FormValue("userBalance"), r.FormValue("transactionHistory"), r.FormValue("addressList"), r.FormValue("paymentList"), id)
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		defer dbConn.Close()
		handle.ReturnJSON(w, dbConn.QueryRow("SELECT * FROM wallets WHERE id = ?", id))
	})(w, r)
}

func DeleteWallet(w http.ResponseWriter, r *http.Request) {
	handle.MakeHandler(func(w http.ResponseWriter, r *http.Request) {
		// Get the wallet ID
		id := r.FormValue("id")

		// Delete the wallet from the database
		dbConn, err := db.Connect()
		if err != nil {
			// handle the error here, e.g. return an error response to the client
		}
		stmt, err := dbConn.Prepare("DELETE FROM wallets WHERE id = ?")
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
