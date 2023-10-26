build:
	@$env:GOOS="linux"; $env:GOARCH="amd64"; go build -o bin/app_linux
	@$env:GOOS="darwin"; $env:GOARCH="amd64"; go build -o bin/app_darwin
	@$env:GOOS="windows"; $env:GOARCH="amd64"; go build -o bin/app.exe

run: build
	@./bin/app

test:
	@go test -v ./...

clean:
	@rm -rf bin

install:
	@go install