package main

import (
	"aph-go-service/transport"
	"database/sql"
	_ "expvar"
	"fmt"
	"net/http"
	"os"

	"github.com/go-kit/kit/log"
)

func main() {

	logger := log.NewLogfmtLogger(os.Stdout)

	transport.RegisterHttpsServicesAndStartListener()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	logger.Log("listening-on", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		logger.Log("listen.error", err)
	}
	//connection string
	connStr := "user=pgotest dbname=CartsDatabase sslmode=verify-full"

	//open database
	db, err := sql.Open("postgres", connStr)

	CheckError(err)

	//close databse
	defer db.Close()

	//check database
	err = db.Ping()
	CheckError(err)

	//if connected
	fmt.Println("Connected")

}

func CheckError(err error) {
	//if error exist
	if err != nil {
		panic(err)
	}
}
