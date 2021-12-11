package transport

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"aph-go-service/datastruct"
	"aph-go-service/logging"
	"aph-go-service/service"

	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	_ "github.com/lib/pq"
	"github.com/subchen/go-curl"
)

// const (
// 	host     = "103.157.96.115"
// 	port     = 5432
// 	user     = "rantaipolygon"
// 	password = "whirlpool"
// 	dbname   = "db_rantaipolygon"
// )

const (
	layoutDateTime = "2006-01-02 15:04:05"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "giansa"
	dbname   = "CartsDatabase"
)

var crt interface{}

var db *sql.DB

// type carts struct {
// 	cart_id          int
// 	status           string
// 	checkout_date    string
// 	payment_date     string
// 	user_id          int
// 	transaction_code string
// 	payment_method   string
// }

type AphService interface {
	HelloWorldService(context.Context, string) string
}

type Carts interface {
}

/*Make interface of data */
var Data interface{}

type aphService struct{}

type CartsService interface {
}

var ErrEmpty = errors.New("empty string")

func (aphService) HelloWorldService(_ context.Context, name string) string {

	return call_ServiceHelloWorld(name)
}

func call_ServiceHelloWorld(name string) string {

	messageResponse := service.HelloWorld(name)

	return messageResponse

}

func makeHelloWorldEndpoint(aph AphService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(datastruct.HelloWorldRequest)
		logging.Log(fmt.Sprintf("Name Request %s", req.NAME))
		v := aph.HelloWorldService(ctx, req.NAME)
		logging.Log(fmt.Sprintf("Response Final Message %s", v))
		return datastruct.HelloWorldResponse{v}, nil
	}
}

func decodeHelloWorldRequest(_ context.Context, r *http.Request) (interface{}, error) {
	var request datastruct.HelloWorldRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		return nil, err
	}
	return request, nil
}

func encodeResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
	return json.NewEncoder(w).Encode(response)
}

func RegisterHttpsServicesAndStartListener() {
	aph := aphService{}

	HelloWorldHandler := httptransport.NewServer(
		makeHelloWorldEndpoint(aph),
		decodeHelloWorldRequest,
		encodeResponse,
	)

	http.Handle("/HelloWorld", HelloWorldHandler)
}

// func Response_Show_Carts(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("Tes show doang")
// }

// func Handle_Show_Carts() {
// 	myRouter := mux.NewRouter().StrictSlash(true)
// 	myRouter.HandleFunc("Carts", Response_Show_Carts).Methods("GET")
// }

func Text() {
	fmt.Println("Hello")
}

func Response_Test(w http.ResponseWriter, r *http.Request) {
	var message = "Wellcome gina"
	w.Write([]byte(message))

}

func checkerror(err error) {
	//if error exist
	if err != nil {
		panic(err)
	}
}

/*Responses*/
func ResponseJSON(w http.ResponseWriter, p interface{}, status int) {
	ubahkeByte, err := json.Marshal(p)

	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		http.Error(w, "error om", http.StatusBadRequest)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write([]byte(ubahkeByte))
}

/*Connect to database*/
func ConnDB() (*sql.DB, error) {
	//connection string
	connStr := fmt.Sprintf("host = %s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	// //open database connect to database
	db, err := sql.Open("postgres", connStr)
	checkerror(err)
	fmt.Println("Database Succesfully Connected")
	//close databse
	//defer db.Close()

	//check database
	err = db.Ping()
	checkerror(err)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func Delete(ctx context.Context, cart datastruct.CartsFields) error {
	db, err := ConnDB()

	if err != nil {
		fmt.Sprintf("cant connect to database")
	}

	queryText := fmt.Sprintf("delete from carts where cart_id = '%d'", cart.Cart_Id)

	s, err := db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	check, err := s.RowsAffected()
	fmt.Println(check)
	if check == 0 {
		return errors.New("id tidak ada")
	}
	return nil
}

func DeleteMahasiswa(w http.ResponseWriter, r *http.Request) {
	if r.Method == "DELETE" {
		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var cart datastruct.CartsFields
		id := r.URL.Query().Get("id")
		if id == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}
		cart.Cart_Id, _ = strconv.Atoi(id)

		if err := Delete(ctx, cart); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}
			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
		return

	}
}

func ShowCarts(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		ctx, cancel := context.WithCancel(context.Background())

		defer cancel()

		carts, err := GetAll(ctx)

		if err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		ResponseJSON(w, carts, http.StatusOK)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

// GetAll
func GetAll(ctx context.Context) ([]datastruct.CartsFields, error) {

	var carts []datastruct.CartsFields

	db, err := ConnDB()

	if err != nil {
		fmt.Print("Cannt connect database", err)
	}

	queryText := ("SELECT * FROM carts Order By cart_id DESC")

	rowQuery, err := db.QueryContext(ctx, queryText)

	if err != nil {
		panic(err)
	}

	for rowQuery.Next() {
		var cart datastruct.CartsFields
		//var Checkout_Date, Payment_Date string

		if err = rowQuery.Scan(
			&cart.Cart_Id,
			&cart.Status,
			&cart.Checkout_Date,
			&cart.Payment_Date,
			&cart.User_Id,
			&cart.Transaction_Code,
			&cart.Payment_Method); err != nil && sql.ErrNoRows != nil {
			return nil, err
		}

		//  Change format string to datetime for created_at and updated_at
		//	cart.Checkout_Date, err = time.Parse(layoutDateTime, Checkout_Date)

		// if err != nil {
		// 	log.Fatal(err)
		// }

		// cart.Payment_Date, err = time.Parse(layoutDateTime, Payment_Date)

		// if err != nil {
		// 	log.Fatal(err)
		// }

		carts = append(carts, cart)
	}

	return carts, nil
}

/*Insert to Cart and Order Items*/
// PostMahasiswa
func PostCart(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {

		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var cart datastruct.CartsFields
		//	var order_item datastruct.OrderItemsFields

		if err := json.NewDecoder(r.Body).Decode(&cart); err != nil {
			ResponseJSON(w, err, http.StatusBadRequest)
			return
		}
		//	, order_item
		if err := InsertCartTable(ctx, cart); err != nil {
			ResponseJSON(w, err, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully",
		}

		ResponseJSON(w, res, http.StatusCreated)

		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

func InsertCartTable(ctx context.Context, cart datastruct.CartsFields) error {
	//, ortem datastruct.OrderItemsFields
	db, err := ConnDB()

	if err != nil {
		fmt.Printf("cannot connect db")
	}
	/*%v bisa untuk segala jenis data*/

	query := fmt.Sprintf("insert into carts (status,checkout_date,payment_date,user_id,transaction_code,payment_method) values ('%v','%v','%v',%v,%v,'%v')",
		cart.Status,
		cart.Checkout_Date,
		cart.Payment_Date,
		cart.User_Id,
		cart.Transaction_Code,
		cart.Payment_Method)

	_, err = db.ExecContext(ctx, query)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}

func GetDataProduk(w http.ResponseWriter, r *http.Request) {
	req := curl.NewRequest()
	req.Method = "GET"
	req.URL = "https://617e57972ff7e600174bd77c.mockapi.io/api/carts/Carts/:id/products"
	resp, err := req.Do()
	if err != nil {
		log.Fatalln("Unable to request ", err)
	}
	fmt.Println(resp.Text())

}

func AddProductToCart(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {

		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var mixco datastruct.MixCartOrder

		if err := json.NewDecoder(r.Body).Decode(&mixco); err != nil {
			ResponseJSON(w, err, http.StatusBadRequest)
			return
		}

		//	, order_item
		if err := InsertPorductToCart(ctx, mixco); err != nil {
			ResponseJSON(w, err, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully",
		}

		ResponseJSON(w, res, http.StatusCreated)

		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

func InsertPorductToCart(ctx context.Context, mixco datastruct.MixCartOrder) error {
	//, ortem datastruct.OrderItemsFields
	db, err := ConnDB()

	if err != nil {
		fmt.Printf("cannot connect db")
	}
	/*%v bisa untuk segala jenis data*/

	query := fmt.Sprintf("call actionfirst_insert_product(%v,%v,'%v','%v',%v,%v)", mixco.Product_Id, mixco.Qty, mixco.Color, mixco.Psize, mixco.Store, mixco.User_Id)

	_, err = db.ExecContext(ctx, query)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}
