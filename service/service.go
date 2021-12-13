package service

import (
	"context"
	"log"

	"github.com/go-kit/kit/log"

	"sadhelx-be-bfecommerce/datastruct"
)

type(
	Service interface{
		AddCart(ctx context.Context, cart datastruct.OrderItem) (*datastruct.OrderItem, error)
		EditCart(ctx context.Context, productID int, quantity int ) error
		getAllCartByCartID(ctx context.Context, cartID int) (*datastruct.ShoppingCart)
	}

	service struct{
		repository datastruct.DBRepository
		logger log.Logger
	}
)

func NewService(repo datastruct.DBRepository, logger log.Logger) Service{
	return &service{
		repository: repo,
		logger: log.With(logger, "repo", "service"),
	}
}

<<<<<<< HEAD
func (s *service) AddCart(ctx context.Context, cart datastruct.DBRepository) (*datastruct.DBRepository, error){
	cartExist, err := s.repository.cartIsExist(ctx, cart.product_id)
	

}
=======
>>>>>>> 4d5c47737142ca39f7a977542873757601a42a87
