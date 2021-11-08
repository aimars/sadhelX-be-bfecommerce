package service

import (
	"context"
	"log"

	"github.com/go-kit/kit/log"
)

type(
	Service interface{
		addCart(ctx context.Context,id int, quantity int,variant string) (string, error)
	}
	service  struct{
		repository datastruct.DBrepository
		logger log.Logger
	}
)

func NewService(repo datastruct.AddCartRepository, logger log.Logger) Service{
	return &service{
		repository: repo,
		logger: log.With(logger, "repo", "service"),
	}
}

func (s *service) AddCart(ctx context.Context,id int, quantity int, variant string) (string,error){
	logger := log.With(s.logger, "method", "AddCart")
	if err := s.repository.AddCart(ctx,); err != nil{
		level.Error(logger).Log("err",err)
		return "", err
	}

	logger.Log("create user",id)
	return "Success",nil
}