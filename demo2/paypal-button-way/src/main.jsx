import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { config } from "./config"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ "client-id": config.PAYPAL_CLIENT_ID }}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
)
