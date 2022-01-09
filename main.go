package main

import (
	"database/sql"
	_ "expvar"
	"fmt"
	"net/http"
	"os"
	"sadhelX-be-bfecommerce/transport"

	"github.com/go-kit/kit/log"
	"github.com/gorilla/mux"

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
	//	http.HandleFunc("/getproduk", transport.GetDataProduk)
	//	http.HandleFunc("/insert/cart", transport.PostCart)
	// http.HandleFunc("/insert/cart", transport.PostCart)

	r := mux.NewRouter()
	/*MENAMBAHKAN PRODUCT KE DALAM CART*/
	r.HandleFunc("user/{id}/product/cart", transport.AddProductToCart)

	/*MENAMPILKAN SELURUH ISI CARTS / USER*/
	r.HandleFunc("/cart/user/{id}", transport.GetCartUser)

	/*DELETE PER CARTS*/
	r.HandleFunc("/cart/{id}", transport.DelCartsReq)

	/*DELETE PER PRODUCTS*/
	r.HandleFunc("/cart/product/order/{id}", transport.DeletePerProductFromCart)

	/*UPDATE COLOR PRODUCT*/
	r.HandleFunc("/cart/product/order/{id}/color", transport.UpdateColor)

	/*UPDATE SIZE PRODUCT*/
	r.HandleFunc("/cart/product/order/{id}/size", transport.UpdateSize)

	/*MENAMBAH QTY +1*/
	r.HandleFunc("/cart/product/order/{id}/qtyplusone", transport.UpdateQtyPlusOne)

	/*MENGURANGI QTY -1*/
	r.HandleFunc("/cart/product/order/{id}/qtyminusone", transport.UpdateQtyMinusOne)

	/*MENGATUR JUMLAH QTY YANG DIINPUTKAN OLEH USER*/

	/*========== PROSES CHECKOUT =============*/
	/*MEMASUKKAN CART KE CHECKOUT*/
	r.HandleFunc("/cart/{id}/checkout", transport.Checkout)

	http.Handle("/", r)

	logger := log.NewLogfmtLogger(os.Stdout)

	transport.RegisterHttpsServicesAndStartListener()

	//show data

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
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
