const http = require('http');

// This will create an event loop that will run continuously to check for a event.
// We can end the event loop by using process.exit()
const server = http.createServer( (req, res) => {
    console.log(req.url, req.method, req.headers);
    // process.exit();
    res.setHeader('Content-Type', 'text/html');
    res.write("<html>");
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>Node JS Server</body>');
    res.write("</html>");
    res.end();
});

server.listen(3000);