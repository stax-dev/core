# Path: Makefile

build:
	@echo "Building for Linux"
	@powershell $$env:GOOS=\"linux\"; $$env:GOARCH=\"amd64\"; go build -o bin/app_linux
	@echo "Building for Mac"
	@powershell $$env:GOOS=\"darwin\"; $$env:GOARCH=\"amd64\"; go build -o bin/app_darwin
	@echo "Building for Windows"
	@powershell $$env:GOOS=\"windows\"; $$env:GOARCH=\"amd64\"; go build -o bin/app.exe

run:
	@go build -o bin/app
	@./bin/app

test:
	@go test -v ./...

clean:
	@rm -rf bin

install:
	@go install