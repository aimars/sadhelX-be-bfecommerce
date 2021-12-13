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
	cloud.google.com/go v0.97.0 // indirect
	github.com/go-kit/log v0.2.0 // indirect
	github.com/go-logfmt/logfmt v0.5.1 // indirect
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/lib/pq v1.10.3 //indirect
	go.opencensus.io v0.23.0 // indirect
	golang.org/x/net v0.0.0-20210917221730-978cfadd31cf // indirect
	golang.org/x/oauth2 v0.0.0-20211005180243-6b3c2da341f1 // indirect
	golang.org/x/sys v0.0.0-20211025201205-69cdffdb9359 // indirect
	golang.org/x/text v0.3.7 // indirect
	google.golang.org/api v0.60.0 // indirect
	google.golang.org/appengine v1.6.7 // indirect
	google.golang.org/genproto v0.0.0-20211021150943-2b146023228c // indirect
	google.golang.org/grpc v1.40.0 // indirect
	google.golang.org/protobuf v1.27.1 // indirect

)

go 1.17
