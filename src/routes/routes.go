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
	Description string
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
		Description: "This is the index route. It returns API information, but not much else. It's mostly used to test if the API is running.",
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
		Description: "This route returns all users. It can also be used to create a user. To create a user, send a POST request to this route with the user data in the request body.",
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
		Description: "This route returns a user. It can also be used to update a user or delete a user. To update a user, send a PUT request to this route with the user data in the request body. To delete a user, send a DELETE request to this route.",
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
			{
				Name:        "PUT",
				HandlerFunc: me.UpdateMe,
			},
		},
		Description: "This route returns the current user. It can also be used to update the current user. To update the current user, send a PUT request to this route with the user data in the request body.",
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
		Description: "This route returns all plans. It can also be used to create a plan. To create a plan, send a POST request to this route with the plan data in the request body.",
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
		Description: "This route returns a plan. It can also be used to update a plan or delete a plan. To update a plan, send a PUT request to this route with the plan data in the request body. To delete a plan, send a DELETE request to this route.",
		HandlerFunc: plans.GetPlan,
	},
}
