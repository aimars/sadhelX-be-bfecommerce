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
	password = "giansa"
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

	//getting data via select
	query := "select * from carts"
	rows, err := db.Query(query)
	CheckError(err)
	defer rows.Close()

	http.HandleFunc("/show", func(w http.ResponseWriter, r *http.Request) {

		for rows.Next() {
			var cart_id int
			var status string
			var checkout_date string
			var payment_date string
			var user_id int
			var transaction_code string
			var payment_method string
			var total int

			err = rows.Scan(&cart_id, &status, &checkout_date, &payment_date, &user_id, &transaction_code, &payment_method, &total)
			CheckError(err)
			//	fmt.Println(cart_id, status, checkout_date, payment_date, user_id, transaction_code, payment_method, total)

			fmt.Fprintln(w, "Cart_id          : ", cart_id)
			fmt.Fprintln(w, "Status           : ", status)
			fmt.Fprintln(w, "Checkout date    : ", checkout_date)
			fmt.Fprintln(w, "Payment Date     : ", payment_date)
			fmt.Fprintln(w, "ID User          : ", user_id)
			fmt.Fprintln(w, "Transaction Code : ", transaction_code)
			fmt.Fprintln(w, "Payment Method   : ", payment_method)
			fmt.Fprintln(w, "Total			  : ", total)
		}

	})

	CheckError(err)

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
