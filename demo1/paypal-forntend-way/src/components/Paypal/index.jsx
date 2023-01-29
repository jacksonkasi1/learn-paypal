import React from "react"

const paymantData = {
  type: "CAPTURE",
  currency_code: "USD",
  amount: 140.5,
  discription: "Jackson Kasi buy a book"
}

const Paypal = () => {
  const paypal = React.useRef()

  React.useEffect(() => {
    let paypalButtons = window.paypal.Buttons({
      createOrder: (data, actions, err) => {
        if (err) {
          console.log(err)
          alert(err.message)
        }
        return actions.order.create({
          intent: paymantData.type,
          purchase_units: [
            {
              discription: paymantData.discription,
              amount: {
                currency_code: paymantData.currency_code,
                value: paymantData.amount
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture()
        console.log("Order SuccessFull", order)
        alert("Transaction completed by " + order.payer.name.given_name + "!")
      },
      onError: (err) => {
        console.log(err)
        alert(err.message)
      },
      style: {
        layout: 'vertical',  // horizontal | vertical
        size:   'large', // medium | large | responsive
        shape:  'rect',      // pill | rect
        color:  'gold'        // gold | blue | silver | white | black
      }
    })

    paypalButtons.render(paypal.current)



    return () => {
      paypalButtons.close()
    }
  }, [])

  return <div ref={paypal}></div>
}

export default Paypal
