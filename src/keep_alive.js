import express from 'express'
const app = express()

app.get('/health_check', function (req, res) {
  res.send("Bookinator is alive")
})

app.listen(8080)