package service

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

type(
	Endpoints struct{
		AddCart endpoint.Endpoint
	}

	AddCartReq struct{
		product_id	int	`json:"product_id"`
		qty 		int `json:"qty"`	
	}

	Response struct {
		Status  bool        `json:"status"`
		Message string      `json:"msg"`
		Data    interface{} `json:"data,omitempty"`
	}



)

func MakeEndpoints(svc Service) Endpoints{
	return Endpoints{
		AddCart:		MakeAddCartEndpoint(svc),
	}
}
func MakeAddCartEndpoint(svc Service) endpoint.Endpoint{
	return func(ctx context.Context, request interface{})(interface{},error){
		req := request.(AddCartReq)

		_, err := svc.addCart(ctx, req.product_id, req.qty)

		if err != nil{
			return Response{{Status: false, Message: err.Error()}, nil}
		}

		
	}
}




