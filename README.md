# SDS Frontend

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 12 or higher)
- [Yarn](https://yarnpkg.com/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [SDS Backend](https://github.com/smarties/sds-backend)

### Installation

1. Clone the repository
2. Install dependencies with `yarn install`
3. Copy `.env.example` to `.env` and adjust the values
4. Start the development server with `yarn start`

### Development

- Run tests with `yarn test`
- Run tests in watch mode with `yarn test:watch`
- Run linting with `yarn lint`
- Run linting in watch mode with `yarn lint:watch`
- Run the development server with `yarn start`
- Run the development server in watch mode with `yarn start:watch`
- Run the development server with a specific port with `yarn start:port <port>`
- Run the development server with a specific port in watch mode with `yarn start:port:watch <port>`
- Run the development server with a specific host with `yarn start:host <host>`
- Run the development server with a specific host in watch mode with `yarn start:host:watch <host>`
- Run the development server with a specific host and port with `yarn start:host:port <host> <port>`

### Deployment

1. Build the Docker image with `yarn build:docker`
2. Start the Docker container with `yarn start:docker`

## License

This project is licensed under the Stax License - see the [LICENSE](LICENSE) file for details.