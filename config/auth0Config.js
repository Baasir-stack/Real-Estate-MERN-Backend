const {auth} = require("express-oauth2-jwt-bearer")

const jwtCheck = auth({
    audience: "http://localhost:8000",
    issuerBaseURL: "https://dev-qtigydl4sxgerldk.us.auth0.com",
    tokenSigningAlg: "RS256"
})

module.exports = jwtCheck;