const fetch = require("node-fetch")
// ** import config
const { PAYAPAL_BASE } = require("../config")

module.exports.createOrder = async (req) => {
  const { currency_code, value, description } = req.body

  const accessToken = req.accessToken

  const url = `${PAYAPAL_BASE}/v2/checkout/orders`

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00"
          }
        }
      ]
    })
  })
  const data = await response.json()
  return data
}

module.exports.captureOrder = async (req) => {
  const { orderID } = req.params

  const accessToken = req.accessToken
  const url = `${PAYAPAL_BASE}/v2/checkout/orders/${orderID}/capture`
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  })
  const data = await response.json()

  return data
}
