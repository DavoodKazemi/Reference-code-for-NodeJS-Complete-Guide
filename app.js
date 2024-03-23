const http = require('http');

const fs = require('fs');


const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // We use "return" here, so the anon function stop executing other lines below
        return res.end();
    }
    if (url === '/message' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            // We use writeFile method, as we want it to be async, because writeFileSync block code until it's finished
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
           
            
        })
        
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();

});

server.listen(3000);