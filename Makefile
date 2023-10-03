build:
	@go build -o bin/app

run: build
	@./bin/app

test:
	@go test -v ./...

clean:
	@rm -rf bin

install:
	@go install