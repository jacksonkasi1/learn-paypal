const route = require("express").Router()

// ** import middlewares
const { genAccToken } = require("../middlewares/paypal")

const { createOrder, captureOrder } = require("../controllers/paypal")

route.get("/", (req, res) => {
  res.send("Hello World")
})

route.post("/paypal/create-order", [genAccToken], createOrder)
route.post("/paypal/order-capture/:orderID", [genAccToken], captureOrder)

module.exports = route
