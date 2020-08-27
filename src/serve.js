const http = require('http');
http.createServer((request, respons) => {

    response.writeHead(200, {'Content-Type': 'application/plain'});

    response.end('Hello World');
}).listen(8090);

console.log('Server running at http://127.0.0.1:8090/');