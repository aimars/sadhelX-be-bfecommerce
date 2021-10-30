module main

require aph-go-service/transport v0.0.0

require (
	github.com/go-kit/kit v0.12.0 // indirect
	github.com/go-kit/log v0.2.0 // indirect
	github.com/go-logfmt/logfmt v0.5.1 // indirect
	github.com/lib/pq v1.10.3 // indirect
)

replace aph-go-service/transport => ./transport

go 1.17
