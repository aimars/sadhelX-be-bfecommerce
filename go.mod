module main

require sadhelX-be-bfecommerce/transport v0.0.0

replace sadhelX-be-bfecommerce/datastruct => ./datastruct

replace sadhelX-be-bfecommerce/logging => ./logging

replace sadhelX-be-bfecommerce/service => ./service

replace sadhelX-be-bfecommerce/transport => ./transport

replace sadhelX-be-bfecommerce/util => ./util

replace sadhelX-be-bfecommerce/router => ./router

require (
	github.com/go-kit/kit v0.12.0
	github.com/gorilla/mux v1.8.0
	github.com/lib/pq v1.10.4
)

require (
	github.com/go-kit/log v0.2.0 // indirect
	github.com/go-logfmt/logfmt v0.5.1 // indirect
	github.com/subchen/go-curl v0.1.0 // indirect
	golang.org/x/net v0.0.0-20210917221730-978cfadd31cf // indirect
	sadhelX-be-bfecommerce/datastruct v0.0.0 // indirect
	sadhelX-be-bfecommerce/logging v0.0.0 // indirect
	sadhelX-be-bfecommerce/service v0.0.0 // indirect

)

go 1.17
