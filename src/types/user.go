// Path: src/types/user.go

package types

import (
	"time"
)

type User struct {
	ID                  string    `json:"id"`
	FirstName           string    `json:"firstName"`
	LastName            string    `json:"lastName"`
	Email               string    `json:"email"`
	UserName            string    `json:"username"`
	UserAvatar          string    `json:"userAvatar"`
	AppTheme            string    `json:"appTheme"`
	BannerID            string    `json:"bannerId"`
	UserRank            string    `json:"userRank"`
	JoinDate            time.Time `json:"joinDate"`
	UserWallet          string    `json:"userWallet"`
	EmailList           string    `json:"emailList"`
	AddressList         string    `json:"addressList"`
	PaymentList         string    `json:"paymentList"`
	DisposableCount     int8      `json:"disposableCount"`
	DisposableActive    bool      `json:"disposableActive"`
	PlanList            string    `json:"planList"`
	UserStatus          string    `json:"accountStatus"`
	LoginActivityList   string    `json:"loginActivityList"`
	PasswordLastChanged time.Time `json:"passwordLastChanged"`
	TransactionHistory  string    `json:"transaction_history"`
	NotificationList    string    `json:"notificationList"`
}
