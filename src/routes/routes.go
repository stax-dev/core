package routes

// Package routes defines the HTTP routes for the API.
import (
	"api/src/handlers/index"
	"api/src/handlers/me"
	"api/src/handlers/plans"
	"api/src/handlers/users"
	"net/http"
)

// Route represents a single route in the application.
type Route struct {
	Name    string
	Methods []struct {
		Name        string
		HandlerFunc http.HandlerFunc
	}
	Pattern     string
	HandlerFunc http.HandlerFunc
}

// Below we define the routes for the API.
// The routes available are:
//     - GET / - The index route.
//     - GET /users - Get all users.
//     - POST /users - Create a user.
//     - GET /user/{id} - Get a user.
//     - PUT /user/{id} - Update a user.
//     - DELETE /user/{id} - Delete a user.
//     - GET /me - Get the current user.
//     - GET /plans - Get all plans.
//     - POST /plans - Create a plan.
//     - GET /plan/{id} - Get a plan.
//     - PUT /plan/{id} - Update a plan.
//     - DELETE /plan/{id} - Delete a plan.
//     - GET /wallets - Get all wallets.
//     - POST /wallets - Create a wallet.
//     - GET /wallet/{id} - Get a wallet.
//     - PUT /wallet/{id} - Update a wallet.
//     - DELETE /wallet/{id} - Delete a wallet.

// Here we define all of the routes for the API and their handlers, as a slice of Route structs.
var Routes = []Route{
	{
		Name:    "Index", // The name of the route. This is used for logging and convenience only.
		Pattern: "/",     // The pattern of the route. This is the path that the route will match.
		Methods: []struct { // We describe the structure of the methods that the route will match (GET, POST, PUT, DELETE and their handlers), and then we define methods for each of them according to the structure we defined.
			Name        string
			HandlerFunc http.HandlerFunc
		}{
			{
				Name:        "GET",             // The name of the method.
				HandlerFunc: index.HandleIndex, // The handler function for the method.
			},
			{
				Name:        "POST",
				HandlerFunc: index.HandleIndex,
			},
			{
				Name:        "PUT",
				HandlerFunc: index.HandleIndex,
			},
			{
				Name:        "DELETE",
				HandlerFunc: index.HandleIndex,
			},
		},
		HandlerFunc: index.HandleIndex, // The handler function for the route. This is the function that will be called when the route is matched.
	},
	{
		Name:    "All Users",
		Pattern: "/users",
		Methods: []struct {
			Name        string
			HandlerFunc http.HandlerFunc
		}{
			{
				Name:        "GET",
				HandlerFunc: users.GetUsers,
			},
			{
				Name:        "POST",
				HandlerFunc: users.CreateUser,
			},
		},
		HandlerFunc: users.GetUsers,
	},
	{
		Name:    "User",
		Pattern: "/user/{id}",
		Methods: []struct {
			Name        string
			HandlerFunc http.HandlerFunc
		}{
			{
				Name:        "GET",
				HandlerFunc: users.GetUser,
			},
			{
				Name:        "PUT",
				HandlerFunc: users.UpdateUser,
			},
			{
				Name:        "DELETE",
				HandlerFunc: users.DeleteUser,
			},
		},
		HandlerFunc: users.GetUser,
	},
	{
		Name:    "Me",
		Pattern: "/me",
		Methods: []struct {
			Name        string
			HandlerFunc http.HandlerFunc
		}{
			{
				Name:        "GET",
				HandlerFunc: me.HandleMe,
			},
		},
		HandlerFunc: me.HandleMe,
	},
	{
		Name:    "All Plans",
		Pattern: "/plans",
		Methods: []struct {
			Name        string
			HandlerFunc http.HandlerFunc
		}{
			{
				Name:        "GET",
				HandlerFunc: plans.GetPlans,
			},
			{
				Name:        "POST",
				HandlerFunc: plans.CreatePlan,
			},
		},
		HandlerFunc: plans.GetPlans,
	},
	{
		Name:    "Plan",
		Pattern: "/plan/{id}",
		Methods: []struct {
			Name        string
			HandlerFunc http.HandlerFunc
		}{
			{
				Name:        "GET",
				HandlerFunc: plans.GetPlan,
			},
			{
				Name:        "PUT",
				HandlerFunc: plans.UpdatePlan,
			},
			{
				Name:        "DELETE",
				HandlerFunc: plans.DeletePlan,
			},
		},
		HandlerFunc: plans.GetPlan,
	},
}
