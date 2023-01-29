import React from "react"

import { PayPalButtons } from "@paypal/react-paypal-js"
import { config } from "../../config"

const btnStyle = {
  layout: "vertical", // horizontal | vertical
  size: "large", // medium | large | responsive
  shape: "rect", // pill | rect
  color: "blue" // gold | blue | silver | white | black
}

const orderData = {
  currency_code: "USD",
  value: 213.01,
  description: "pay from client"
}

const Paypal = () => {
  const createOrder = (data, actions) => {
    // use the "body" param to optionally pass additional order information
    // like product ids or amount
    return fetch(`${config.SERVER_URL}/paypal/create-order`, {
      method: "post",
      body: JSON.stringify(orderData)
    })
      .then((response) => {
        return response.json()
      })
      .then((order) => {
        console.log(order)
        return order.id
      })
  }

  const onApprove = (data, actions) => {
    return fetch(`${config.SERVER_URL}/paypal/order-capture/` + data.orderID, {
      method: "post"
    })
      .then((response) => response.json())
      .then((details) => {
        alert("Transaction completed by " + details.payer.name.given_name)
      })
  }

  return (
    <div>
      <h1>Paypal ( react + node )</h1>
      <br />
      <PayPalButtons
        style={btnStyle}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}

export default Paypal
