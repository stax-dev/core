"""
This is the proxy and routing engine for the SDS Project. It takes in all the different services we have from the config.json file, along with the different valid requests for each service. It then routes the request to the appropriate service, and returns the response to the client without letting the client know which service it is actually talking to, thus acting as a proxy. It should not send the client to the location, but rather send the request to the service and return the response to the client. The user experience should be that the domain and url they chose to use doesn't change, but the content they are receiving is from the service they chose.
"""

import json
import re
from flask import Flask, request, Response
import requests

# Load the configuration from config.json
with open('config.json') as f:
    config = json.load(f)

app = Flask(__name__)

# For each service in the configuration, create a route for each request
for service in config:
    service_host = service['service_host']
    service_port = service['service_port']
    service_protocol = service['service_protocol']

    for req in service.get('requests', []):
        request_path = req['request_path']
        request_domain = req['request_domain']

        if 'variables' in service:
            for var in service['variables']:
                request_path = request_path.replace('{' + var + '}', f'<{var}>')

        def create_proxy(service_protocol, service_host, service_port):
            def proxy():
                # Extract variables from the URL
                url_variables = request.view_args

                # Add the variables to the headers
                headers = {key: value for (key, value) in request.headers if key != 'Host'}
                headers.update(url_variables)

                resp = requests.request(
                    method=request.method,
                    url=f'{service_protocol}://{service_host}:{service_port}' + request.path,
                    headers=headers,
                    data=request.get_data(),
                    cookies=request.cookies,
                    allow_redirects=False)

                # Forward the response back to the client
                headers = [(name, value) for (name, value) in resp.raw.headers.items()]
                response = Response(resp.content, resp.status_code, headers)
                return response

            return proxy

        app.route(re.compile('^' + request_path + '$'), methods=['GET', 'POST'], host=request_domain)(create_proxy(service_protocol, service_host, service_port))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)