<!-- Path: README.md -->

# sds-router
This is the routing agent for the SDS project. It is responsible for:
- Accepting all requests to the *st.ax domains
- Redirecting requests to the appropriate service
- Handling all requests to the root domain

## Usage
The router is written in Go and uses the mux router. To run the router, simply run the following command:
```bash
make run
```

## Configuration
The router is split up by service. The services we currently have are:
- The Website (https://st.ax)
- The API (https://api.st.ax)
- The Auth Service (https://auth.st.ax)
- The IDE (https://code.st.ax)
- Userprofiles (https://{user}.st.ax)
- The Docs (https://docs.st.ax)
- The Splashboard (https://splash.st.ax)
- The Dashboard (https://dash.st.ax)
- The CDN (https://cdn.st.ax)
- and more...

Each service has its own configuration file in the `config` directory. The configuration files are written in JSON and have the following structure:
```json
{
    "name": "The name of the service", // website, api, auth, etc.
    "requests": [
        {
            "request_domain": "The domain to listen for", // st.ax, api.st.ax, etc.
            "request_path": "The path to listen for", // /, /api, /auth, etc.
            "request_method": "The method to listen for", // GET, POST, PUT, etc.
            "request_ports": "The port to listen on", // 80, 443, etc.
        }
    ]
}
```