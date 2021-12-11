package datastruct

type HelloWorldRequest struct {
	NAME string `json:"name"`
}

type HelloWorldResponse struct {
	MESSAGE string `json:"message"`
}

// type Hello struct{
// 	l *log.Logger
// }

type CartsFields struct {
	Cart_Id          int    `json : "id_cart,omitempty"`
	Status           string `json : "status"`
	Checkout_Date    string `json : "checkout_date"`
	Payment_Date     string `json : "payment_date"`
	User_Id          int    `json : "user_id"`
	Transaction_Code int    `json :"transaction_code"`
	Payment_Method   string `json : "payment_method"`
}

type OrderItemsFields struct {
	Oritem_id  int    `json : "oritem_id"`
	Cart_Id    int    `json : "id_cart"`
	Product_Id int    `json : "product_id"`
	Qty        int    `json : "qty"`
	Color      string `json : "color"`
	Psize      string `json : "psize"`
	Store      int    `json : store_id`
}

type MixCartOrder struct {
	Oritem_id        int    `json : "oritem_id"`
	Cart_Id          int    `json : "id_cart"`
	Product_Id       int    `json : "product_id"`
	Qty              int    `json : "qty"`
	Color            string `json : "color"`
	Psize            string `json : "psize"`
	Store            int    `json : store_id`
	Status           string `json : "status"`
	Checkout_Date    string `json : "checkout_date"`
	Payment_Date     string `json : "payment_date"`
	User_Id          int    `json : "user_id"`
	Transaction_Code int    `json :"transaction_code"`
	Payment_Method   string `json : "payment_method"`
}
