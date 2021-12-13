package datastruct

import (
	"context"
	"time"
)

type HelloWorldRequest struct {
	NAME string `json:"name"`
}

type HelloWorldResponse struct {
	MESSAGE string `json:"message"`
}

type (
	OrderItem struct {
		product_id int 		`json:"product_id"`
		cart_id    int 		`json:"cart_id"`
		qty        int 		`json:"qty"`
		size	   string	`json:"size"`
		color	   string	`json:"color"`	
		subtotal   int 		`json:"subtotal"`
	}

	ShoppingCart struct{
		cart_id				int 		`json:"cart_id"`
		status				string		`json:"status"`
		checkout_date		time.Time	`json:"checkout_date"`
		payment_date		time.Time	`json:"payment_date"`
		user_id				int			`json:"user_id"`
		transaction_code	string		`json:"transaction_code"`
		payment_method		string		`json:"payment_method"`
		total				int			`json:"total"`
	}


	DBRepository interface {
		getOrderItem(ctx context.Context,id_cart int) (*OrderItem, error)
		addItemCart(ctx context.Context, id int, quantity int, ukuran string, color string ) error
		createCart(ctx context.Context, cart *OrderItem) error
		editOrderItem(ctx context.Context,cartID int, accountID int, productID int, quantity int) (*OrderItem, error)
		cartIsExist(ctx context.Context, id_toko int) (bool,error)
		productIsExist(ctx context.Context, id_produk int) (bool, error)
	}
)
