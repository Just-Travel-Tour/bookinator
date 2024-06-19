import http from 'http'
const port = 8080;

const requestHandler = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bookinator is alive!');
}

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server is running`);
});