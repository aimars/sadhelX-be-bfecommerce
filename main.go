package main

import (
	"aph-go-service/transport"
	"database/sql"
	_ "expvar"
	"fmt"
	"net/http"
	"os"

	"github.com/go-kit/kit/log"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "giansa"
	dbname   = "CartsDatabase"
)

func ShowAllCarts(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hello Iam Nala")
}

func main() {
	//connection string
	connStr := fmt.Sprintf("host = %s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	//open database
	db, err := sql.Open("postgres", connStr)
	CheckError(err)
	//fmt.Println("Database Succesfully Connected")
	//close databse
	defer db.Close()

	//check database
	err = db.Ping()
	CheckError(err)

	fmt.Println("Database Succesfully Connected")

	/*Endpoint*/
	http.HandleFunc("/show", transport.ShowCarts)
	http.HandleFunc("/insert/cart", transport.PostCart)
	http.HandleFunc("/getproduk", transport.GetDataProduk)
	//	http.HandleFunc("/insert/cart", transport.PostCart)

	/*MENAMBAHKAN PRODUCT KE DALAM CART*/
	http.HandleFunc("/insert/producttocart", transport.AddProductToCart)

	/*MENAMPILKAN SELURUH ISI CARTS / USER*/

	/*DELETE PER CARTS*/
	http.HandleFunc("/cart/delete", transport.DelCartsReq)
	logger := log.NewLogfmtLogger(os.Stdout)

	transport.RegisterHttpsServicesAndStartListener()

	//show data

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	logger.Log("listening-on", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		logger.Log("listen.error", err)
	}

}

func CheckError(err error) {
	//if error exist
	if err != nil {
		panic(err)
	}
}
