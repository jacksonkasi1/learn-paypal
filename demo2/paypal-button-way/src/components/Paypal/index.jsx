import React from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"

const btnStyle = {
  layout: "vertical", // horizontal | vertical
  size: "large", // medium | large | responsive
  shape: "rect", // pill | rect
  color: "blue" // gold | blue | silver | white | black
}
const orderData = {
  intent: "CAPTURE",
  purchase_units: [
    {
      description: "T-shirt",
      amount: {
        currency_code: "USD",
        value: 340.5
      }
    }
  ]
}

const Paypal = () => {
  const [paidFor, setPaidFor] = React.useState(false)
  const [paymentData, setPaymentData] = React.useState(null)
  const [error, setError] = React.useState(null)

  const handlApprove = (orderId) => {
    setPaidFor(true)
    console.log("orderId", orderId)
  }

  if (paidFor) {
    alert(
      "Thank you for your purchase. You will receive an email confirmation shortly."
    )
    console.log(paymentData)
    return (
      <div>
        <p>
          Thank you for your purchase. You will receive an email confirmation
          shortly.
        </p>
        <br />
        <button
          onClick={() => {
            window.location.reload()
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  if (error) {
    alert(error)
  }

  return (
    <div>
      <h1>Paypal</h1>
      <br />
      <PayPalButtons
        style={btnStyle}
        createOrder={(data, actions) => {
          return actions.order.create(orderData)
        }}
        onApprove={async (data, actions) => {
          console.log("onApprove", data)
          const order = await actions.order.capture()
          console.log("order", order)
          alert("Transaction completed by " + order.payer.name.given_name + "!")
          setPaymentData(order)
          handlApprove(data.orderID)
        }}
        onError={(err) => {
          console.error("err = ", err)
          setError(err)
        }}
        onCancel={(data) => {
          console.error(data)
          alert("Transaction Cancelled!")
        }}
        onClick={(data, actions) => {
          console.log("onClick- data : ", data)
          console.log("onClick - actions : ", actions)
          if (paidFor) {
            alert("You have already paid for this item.")
            return actions.reject()
          } else {
            return actions.resolve()
          }
        }}
      />
    </div>
  )
}

export default Paypal
