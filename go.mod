module main
require aph-go-service/transport v0.0.0
require aph-go-service/datastruct v0.0.0
require aph-go-service/logging v0.0.0
require aph-go-service/service v0.0.0

replace aph-go-service/datastruct => ./datastruct
replace aph-go-service/logging => ./logging
replace aph-go-service/service => ./service
replace aph-go-service/transport => ./transport
require github.com/go-kit/kit v0.12.0

require (
	github.com/go-kit/log v0.2.0 // indirect
	github.com/go-logfmt/logfmt v0.5.1 // indirect
	github.com/lib/pq v1.10.3 //indirect

)


go 1.17


