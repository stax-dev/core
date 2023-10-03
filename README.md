# SDS Backend

## Getting Started

### Prerequisites

- [Go](https://golang.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)


### Installation

1. Clone the repository
2. Run `make install`
3. Run `go mod tidy`

### Development

- Run tests with `make test`
- Run the server with `make run`
- Run the server with hot reloading with `make run-watch`

- Compile the binary with `make build`
- Run the binary with `make run-binary`

### Deployment

1. Build the Docker image with `make build-docker`
2. Push the Docker image to GHCR with `make push-docker`
3. Deploy the Docker image with `make deploy-docker`

### Database

```comment
All database migrations are handled by the SDS Backend.
```

## License

This project is licensed under the Stax License - see the [LICENSE](LICENSE) file for details.