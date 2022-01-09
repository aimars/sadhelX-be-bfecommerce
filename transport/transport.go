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

	"sadhelX-be-bfecommerce/datastruct"
	"sadhelX-be-bfecommerce/logging"
	"sadhelX-be-bfecommerce/service"

	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"github.com/subchen/go-curl"
)

const (
	layoutDateTime = "2006-01-02 15:04:05"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "giansa"
	dbname   = "DatabaseCarts"
)

var crt interface{}

var db *sql.DB

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

/*============================ MEMASUKKAN ITEM KEDALAM CART =========================================*/
func AddProductToCart(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {

		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
			return
		}

		//id := r.URL.Query().Get("id")

		vars := mux.Vars(r)
		key := vars["id"]

		if key == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var mixco datastruct.MixCartOrder
		mixco.User_Id, _ = strconv.Atoi(key)

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

	query := db.QueryRow("call actionfirst_insert_product($1,$2,$3,$4,$5,$6)", mixco.Product_Id, mixco.Qty, mixco.Color, mixco.Psize, mixco.Store_Id, mixco.User_Id)
	if query != nil {
		fmt.Printf("success")
	}

	return nil
}

/*MENGHAPUS PER-PRODUCT DARI CARTS*/

/*MENGHAPUS  PER-CARTSCART*/
func DelCartsReq(w http.ResponseWriter, r *http.Request) {

	if r.Method == "DELETE" {

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var cartdel datastruct.MixCartOrder

		vars := mux.Vars(r)
		key := vars["id"]

		if key == " " {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}

		cartdel.Cart_Id, _ = strconv.Atoi(key)
		if err := DeleteCart(ctx, cartdel); err != nil {

			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully",
		}

		ResponseJSON(w, res, http.StatusOK)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

func DeleteCart(ctx context.Context, cartdel datastruct.MixCartOrder) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("call delete_percart('%d')", cartdel.Cart_Id)
	fmt.Println(queryText)
	s, err := db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	check, err := s.RowsAffected()

	if check != 0 {
		return errors.New("Failed Deleted")
	}

	return nil
}

/*MENGHAPUS PER ITEM PRODUCT*/

/*Update varian warna*/
func UpdateColorProductReq(w http.ResponseWriter, r *http.Request) {
	if r.Method == "PUT" {

		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var oritem datastruct.OrderItemsFields

		id_cart := r.URL.Query().Get("id_cart")
		id_product := r.URL.Query().Get("id_product")

		if id_cart == "" {
			ResponseJSON(w, "id cart tidak boleh kosong", http.StatusBadRequest)
			return
		}

		oritem.Cart_Id, _ = strconv.Atoi(id_cart)
		oritem.Product_Id, _ = strconv.Atoi(id_product)

		if err := json.NewDecoder(r.Body).Decode(&oritem); err != nil {
			ResponseJSON(w, err, http.StatusBadRequest)
			return
		}

		if err := UpdateColorSql(ctx, oritem); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
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

func UpdateColorSql(ctx context.Context, oritem datastruct.OrderItemsFields) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("update order_items set color = %v where product_id = %v and cart_id = %v",
		oritem.Color,
		oritem.Product_Id,
		oritem.Cart_Id)

	fmt.Println(queryText)

	_, err = db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {

		return err
	}

	return nil
}

/*================================================== UPDATE SIZE PRODUCT ================================================== */

/*ADD QTY + 1 */
func UpdateQtyPlusOne(w http.ResponseWriter, r *http.Request) {
	if r.Method == "PUT" {

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var ortem datastruct.OrderItemsFields

		//id := r.URL.Query().Get("id")

		vars := mux.Vars(r)
		key := vars["id"]

		if key == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}
		ortem.Oritem_id, _ = strconv.Atoi(key)

		if err := UpdateQuantityPlusOne(ctx, ortem); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully add 1 to qty",
		}

		ResponseJSON(w, res, http.StatusCreated)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

// Update
func UpdateQuantityPlusOne(ctx context.Context, oritem datastruct.OrderItemsFields) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("UPDATE order_items set qty = qty+1 where oritem_id  = '%d'",
		oritem.Oritem_id)
	fmt.Println(queryText)

	_, err = db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}

/*================================================================================================================*/

/*----------------------------------------------------- MINUS QTY - 1 ---------------------------------------------*/
func UpdateQtyMinusOne(w http.ResponseWriter, r *http.Request) {
	if r.Method == "PUT" {

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var ortem datastruct.OrderItemsFields

		//id := r.URL.Query().Get("id")

		vars := mux.Vars(r)
		key := vars["id"]

		if key == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}
		ortem.Oritem_id, _ = strconv.Atoi(key)

		if err := UpdateQuantityMinusOne(ctx, ortem); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully minus 1 to qty",
		}

		ResponseJSON(w, res, http.StatusCreated)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

// Update
func UpdateQuantityMinusOne(ctx context.Context, oritem datastruct.OrderItemsFields) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("call procedure_minus_qty('%d')",
		oritem.Oritem_id)
	fmt.Println(queryText)

	_, err = db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}

/*----------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------- UPDATE COLOR -------------------------------------------*/
func UpdateColor(w http.ResponseWriter, r *http.Request) {
	if r.Method == "PUT" {
		/*set color via json*/
		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var ortem datastruct.OrderItemsFields

		//id := r.URL.Query().Get("id")
		vars := mux.Vars(r)
		key := vars["id"]

		if key == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}
		ortem.Oritem_id, _ = strconv.Atoi(key)

		if err := json.NewDecoder(r.Body).Decode(&ortem); err != nil {
			ResponseJSON(w, err, http.StatusBadRequest)
			return
		}
		if err := UpdateColorPSql(ctx, ortem); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully change your choice color",
		}

		ResponseJSON(w, res, http.StatusCreated)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

// Update
func UpdateColorPSql(ctx context.Context, oritem datastruct.OrderItemsFields) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("update order_items set color = '%s' where oritem_id = '%d'",
		oritem.Color,
		oritem.Oritem_id)
	fmt.Println(queryText)

	_, err = db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}

/*===============================================================================================================*/

/*------------------------------------------------------- UPDATE SIZE -------------------------------------------*/
func UpdateSize(w http.ResponseWriter, r *http.Request) {
	if r.Method == "PUT" {
		/*set color via json*/
		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var ortem datastruct.OrderItemsFields

		//id := r.URL.Query().Get("id")
		vars := mux.Vars(r)
		key := vars["id"]

		if key == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}
		ortem.Oritem_id, _ = strconv.Atoi(key)

		if err := json.NewDecoder(r.Body).Decode(&ortem); err != nil {
			ResponseJSON(w, err, http.StatusBadRequest)
			return
		}
		if err := UpdateSizeSql(ctx, ortem); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully change size product choosen",
		}

		ResponseJSON(w, res, http.StatusCreated)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

// Update
func UpdateSizeSql(ctx context.Context, oritem datastruct.OrderItemsFields) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("update order_items set psize = '%s' where oritem_id = '%d'",
		oritem.Psize,
		oritem.Oritem_id)
	fmt.Println(queryText)

	_, err = db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}

/*===============================================================================================================*/

/*------------------------------------- DELETE PER ITEM FROM ORDER_ITEMS --------------------------------------------*/
func DeletePerProductFromCart(w http.ResponseWriter, r *http.Request) {
	if r.Method == "DELETE" {

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var ortem datastruct.OrderItemsFields

		//id := r.URL.Query().Get("id")
		vars := mux.Vars(r)
		key := vars["id"]

		if key == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}
		ortem.Oritem_id, _ = strconv.Atoi(key)

		if err := DeletePerProductFromCartSql(ctx, ortem); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully Delete Product from Cart",
		}

		ResponseJSON(w, res, http.StatusOK)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

func DeletePerProductFromCartSql(ctx context.Context, oritem datastruct.OrderItemsFields) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("delete from order_items where oritem_id = '%d'",
		oritem.Oritem_id)
	fmt.Println(queryText)

	_, err = db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}

/*===================================================================================================================*/
/*------------------------------------------------------- UPDATE QTY -------------------------------------------*/
func UpdateQuantity(w http.ResponseWriter, r *http.Request) {
	if r.Method == "PUT" {
		/*set qty via json*/
		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var ortem datastruct.OrderItemsFields

		id := r.URL.Query().Get("id")

		if id == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}
		ortem.Oritem_id, _ = strconv.Atoi(id)

		if err := json.NewDecoder(r.Body).Decode(&ortem); err != nil {
			ResponseJSON(w, err, http.StatusBadRequest)
			return
		}
		if err := UpdateQtySql(ctx, ortem); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully change size product choosen",
		}

		ResponseJSON(w, res, http.StatusCreated)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

func UpdateQtySql(ctx context.Context, oritem datastruct.OrderItemsFields) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("update order_items set qty = '%d' where oritem_id = '%d'",
		oritem.Qty,
		oritem.Oritem_id)
	fmt.Println(queryText)

	_, err = db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}

/*===============================================================================================================*/
/*------------------------------------------------ CHECKOUT  ---------------------------------------------------*/
func Checkout(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		/*set payment method via json*/
		if r.Header.Get("Content-Type") != "application/json" {
			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		var cart datastruct.CartsFields

		//id := r.URL.Query().Get("id")
		vars := mux.Vars(r)
		key := vars["id"]

		if key == "" {
			ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
			return
		}
		cart.Cart_Id, _ = strconv.Atoi(key)

		if err := json.NewDecoder(r.Body).Decode(&cart); err != nil {
			ResponseJSON(w, err, http.StatusBadRequest)
			return
		}
		if err := CheckoutSql(ctx, cart); err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		res := map[string]string{
			"status": "Succesfully Checkout",
		}

		ResponseJSON(w, res, http.StatusCreated)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

func CheckoutSql(ctx context.Context, cart datastruct.CartsFields) error {

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Can't connect to database", err)
	}

	queryText := fmt.Sprintf("call checkout_prosedur('%d','%s')", cart.Cart_Id, cart.Payment_Method)
	fmt.Println(queryText)

	_, err = db.ExecContext(ctx, queryText)

	if err != nil && err != sql.ErrNoRows {
		return err
	}

	return nil
}

/*=======================================================================================================*/
/*================================= Menampilkan daftar cart =============================================*/
func GetCartUser(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		ctx, cancel := context.WithCancel(context.Background())

		defer cancel()
		var keyy int
		//user_id := r.URL.Query().Get("user_id")

		// if user_id == "" {
		// 	ResponseJSON(w, "id tidak boleh kosong", http.StatusBadRequest)
		// 	return
		// }

		// id, _ = strconv.Atoi(user_id)
		vars := mux.Vars(r)
		key := vars["id"]
		keyy, _ = strconv.Atoi(key)
		crt, err := GetAllCartUser(ctx, keyy)

		if err != nil {
			kesalahan := map[string]string{
				"error": fmt.Sprintf("%v", err),
			}

			ResponseJSON(w, kesalahan, http.StatusInternalServerError)
			return
		}

		ResponseJSON(w, crt, http.StatusOK)
		return
	}

	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
	return
}

func GetAllCartUser(ctx context.Context, iduser int) ([]datastruct.MixCartOrder, error) {

	var carts []datastruct.MixCartOrder

	db, err := ConnDB()

	if err != nil {
		log.Fatal("Cant connect to Database", err)
	}

	queryText := fmt.Sprintf("select * from v_cartsandproduct where id_user = '%d'", iduser)

	rowQuery, err := db.QueryContext(ctx, queryText)

	if err != nil {
		log.Fatal(err)
	}

	for rowQuery.Next() {
		var cart datastruct.MixCartOrder

		if err = rowQuery.Scan(
			&cart.Cart_Id,
			&cart.User_Id,
			&cart.Status,
			&cart.Oritem_id,
			&cart.Product_Id,
			&cart.Qty,
			&cart.Color,
			&cart.Psize,
			&cart.Store_Id); err != nil && sql.ErrNoRows != nil {
			return nil, err
		}

		if err != nil {
			log.Fatal(err)
		}

		if err != nil {
			log.Fatal(err)
		}

		carts = append(carts, cart)
	}

	return carts, nil
}

/*========================================== GET product ===========================================*/
// func AddProductCart(w http.ResponseWriter, r *http.Request) {
// 	if r.Method == "POST" {

// 		if r.Header.Get("Content-Type") != "application/json" {
// 			http.Error(w, "Gunakan content type application / json", http.StatusBadRequest)
// 			return
// 		}

// 		ctx, cancel := context.WithCancel(context.Background())
// 		defer cancel()

// 		var mixco datastruct.MixCartOrder

// 		if err := json.NewDecoder(r.Body).Decode(&mixco); err != nil {
// 			ResponseJSON(w, err, http.StatusBadRequest)
// 			return
// 		}

// 		//	, order_item
// 		if err := InsertProductCart(ctx, mixco); err != nil {
// 			ResponseJSON(w, err, http.StatusInternalServerError)
// 			return
// 		}

// 		res := map[string]string{
// 			"status": "Succesfully",
// 		}

// 		ResponseJSON(w, res, http.StatusCreated)

// 		return
// 	}

// 	http.Error(w, "Tidak di ijinkan", http.StatusMethodNotAllowed)
// 	return
// }

// func InsertProductCart(ctx context.Context, mixco datastruct.MixCartOrder) error {
// 	//, ortem datastruct.OrderItemsFields
// 	db, err := ConnDB()

// 	if err != nil {
// 		fmt.Printf("cannot connect db")
// 	}
// 	/*%v bisa untuk segala jenis data*/

// 	query := db.QueryRow("call actionfirst_insert_product($1,$2,$3,$4,$5,$6)", mixco.Product_Id, mixco.Qty, mixco.Color, mixco.Psize, mixco.Store_Id, mixco.User_Id)
// 	if query != nil {
// 		fmt.Printf("success")
// 	}

// 	return nil
// }
