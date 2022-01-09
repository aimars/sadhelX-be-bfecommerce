package main

import (
	"aph-go-service/transport"
	"database/sql"
	"encoding/json"
	_ "expvar"
	"fmt"
	"net/http"
	"os"

	"github.com/go-kit/kit/log"

	_ "github.com/lib/pq"
)

type Cart struct {
	Name string `json:"name"`
	Nickname string `json:"nickname"`
	}

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "dwn070302"
	dbname   = "CartsDatabase"
)

func OpenConnection() *sql.DB{
	connStr := fmt.Sprintf("host = %s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", connStr)
	CheckError(err)

	err = db.Ping()
	CheckError(err)

	return db
}

func POSTHandler(w http.ResponseWriter, r *http.Request){
	db := OpenConnection()

	err := json.NewDecoder(r.body).Decode(&p)

	if err != nil{
		http
	}
}

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
	//
	http.HandleFunc("/insert/cart", transport.PostCart)
	//	http.HandleFunc("/getproduk", transport.GetDataProduk)
	//	http.HandleFunc("/insert/cart", transport.PostCart)

	/*MENAMBAHKAN PRODUCT KE DALAM CART*/
	http.HandleFunc("/insert/producttocart", transport.AddProductToCart)

	/*MENAMPILKAN SELURUH ISI CARTS / USER*/
	http.HandleFunc("/cart", transport.GetCartUser)

	/*DELETE PER CARTS*/
	http.HandleFunc("/delete/cart", transport.DelCartsReq)

	/*DELETE PER PRODUCTS*/
	http.HandleFunc("/delete/product", transport.DeletePerProductFromCart)

	/*UPDATE COLOR PRODUCT*/
	http.HandleFunc("/update/color", transport.UpdateColor)

	/*UPDATE SIZE PRODUCT*/
	http.HandleFunc("/update/size", transport.UpdateSize)

	/*MENAMBAH QTY +1*/
	http.HandleFunc("/addqty", transport.UpdateQtyPlusOne)

	/*MENGURANGI QTY -1*/
	http.HandleFunc("/minusqty", transport.UpdateQtyMinusOne)

	/*MENGATUR JUMLAH QTY YANG DIINPUTKAN OLEH USER*/

	/*========== PROSES CHECKOUT =============*/
	/*MEMASUKKAN CART KE CHECKOUT*/
	http.HandleFunc("/checkout", transport.Checkout)

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
