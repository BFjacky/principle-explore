const http = require(`http`);
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    const result = `returnRes(${JSON.stringify({ name: 'cyf' })})`;
    response.end(result);
}).listen(3000);