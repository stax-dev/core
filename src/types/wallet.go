package types

type Wallet struct {
	WalletID           string `json:"walletID"`
	LinkedUserID       string `json:"linkedUserID"`
	UserBalance        int16  `json:"userBalance"`
	TransactionHistory string `json:"transactionHistory"`
	AddressList        string `json:"addressList"`
	PaymentList        string `json:"paymentList"`
}
