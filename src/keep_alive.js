import express from 'express'
const app = express()

app.get('/', function (req, res) {
  res.send("Bookinator is alive")
})

app.listen(8080)