package router

import (
	"aph-go-service/transport"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Routers() *mux.Router {

	router := mux.NewRouter()
	router.HandleFunc("/carts/input", transport.CreateCarts).Methods("POST", "OPTIONS")

	return router
}
