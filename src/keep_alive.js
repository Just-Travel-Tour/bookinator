import http from 'http'
const port = process.env.PORT || 8080;

const requestHandler = (req, res) => {
  console.log("health_check")
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bookinator is alive!');
}

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Bookinator Server is running`);
});