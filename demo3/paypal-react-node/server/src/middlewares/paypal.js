const HttpStatus = require("http-status-codes")
const fetch = require("node-fetch")

// ** config
const { PAYAPAL_CLIENT_ID, PAYAPAL_APP_SECRET, PAYAPAL_BASE,  } = require("../config")

// generate an access token using client id and app secret
async function genAccToken(req, res, next) {
  try {
    const auth = Buffer.from(PAYAPAL_CLIENT_ID + ":" + PAYAPAL_APP_SECRET).toString("base64")
    const response = await fetch(`${PAYAPAL_BASE}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`
      }
    })
    const data = await response.json()

    req.accessToken = data.access_token
    next()
  } catch (error) {
    console.log(error)
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: error.message || "Internal Server Error"
    })
  }
}

module.exports = {
  genAccToken
}
