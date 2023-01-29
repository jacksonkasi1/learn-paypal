import React from "react"
import Payapal from "./components/Paypal"
import './App.css'

const App = () => {
  const [checkout, setCheckout] = React.useState(false)
  return (
    <div className="App" >
      {checkout ? (
        <Payapal />
      ) : (
        <button onClick={() => setCheckout(true)}>Checkout</button>
      )}
    </div>
  )
}

export default App
