// Path: src/types/plan.go

package types

import (
	"time"
)

type Plan struct {
	ID             string    `json:"planID"`
	Name           string    `json:"planName"`
	OwnerID        string    `json:"ownerID"`
	CreationDate   time.Time `json:"planCreationDate"`
	MembersList    string    `json:"membersList"`
	LinkedWalletID string    `json:"linkedWalletID"`
	Frequency      string    `json:"paymentFrequency"`
	Amount         string    `json:"paymentAmount"`
	Currency       string    `json:"paymentCurrency"`
}
