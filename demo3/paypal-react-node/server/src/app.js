const express = require("express")
const app = express()
const cors = require("cors")

const PORT = process.env.PORT || 5000

const routes = require("./api")

app.use(cors())
app.use(express.json())
app.use(routes)

const server = () =>
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })

module.exports = server
