const HttpStatus = require("http-status-codes")
const payPalHandler = require("../handlers/paypal")

exports.createOrder = async (req, res) => {
  try {
    const createOrder = await payPalHandler.createOrder(req, res)
    res.status(HttpStatus.StatusCodes.OK).send(createOrder)
  } catch (error) {
    console.log(error.message)
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error.message || "Internal Server Error"
    })
  }
}

exports.captureOrder = async (req, res) => {
  try {
    const captureOrder = await payPalHandler.captureOrder(req, res)
    res.status(HttpStatus.StatusCodes.OK).send(captureOrder)
  } catch (error) {
    console.log(error.message)
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error.message || "Internal Server Error"
    })
  }
}
