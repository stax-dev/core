package routes

import (
	"api/src/handlers/index"
	"api/src/handlers/me"
	"api/src/handlers/users"
	"net/http"
)

type Route struct {
	Name    string
	Methods []struct {
		Name        string
		HandlerFunc http.HandlerFunc
	}
	Pattern     string
	HandlerFunc http.HandlerFunc
}

var Routes = []Route{
	{
		Name:    "Index",
		Pattern: "/",
		Methods: []struct {
			Name        string
			HandlerFunc http.HandlerFunc
		}{
			{
				Name:        "GET",
				HandlerFunc: index.HandleIndex,
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
	},
}
