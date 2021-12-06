module main

require aph-go-service/transport v0.0.0

replace aph-go-service/datastruct => ./datastruct

replace aph-go-service/logging => ./logging

replace aph-go-service/service => ./service

replace aph-go-service/transport => ./transport

replace aph-go-service/util => ./util

replace aph-go-service/router => ./router

require (
	aph-go-service/datastruct v0.0.0
	github.com/go-kit/kit v0.12.0
	github.com/lib/pq v1.10.4
)

require (
	aph-go-service/logging v0.0.0 // indirect
	aph-go-service/service v0.0.0 // indirect
	github.com/go-kit/log v0.2.0 // indirect
	github.com/go-logfmt/logfmt v0.5.1 // indirect
	github.com/subchen/go-curl v0.1.0 // indirect
	golang.org/x/net v0.0.0-20210917221730-978cfadd31cf // indirect

)

go 1.17
