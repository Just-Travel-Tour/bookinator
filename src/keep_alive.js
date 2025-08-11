import http from 'http'
import url from 'url';
const port = process.env.PORT || 8080;

const requestHandler = (req, res) => {
  const parsedUrl =  url.parse(req.url, true)
  const path = parsedUrl.pathname
  const method = req.method

  if (path === '/health_check' && method === 'GET') {
    console.log("health_check")
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bookinator is alive!');
    return
  }

  if (path === '/keep_alive' && method === 'GET') {
    console.log("keep_alive")
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bookinator is alive!');
    return
  }

  if (path === '/ping' && method === 'GET') {
    console.log("ping")
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Pong');
    return
  }

  console.log(`Received request for ${path} with method ${method}`);
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}
const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Bookinator Server is running on port ${port}`);
});