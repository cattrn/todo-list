const express = require("express")
const jwt = require('jsonwebtoken') // for middleware
const JwtStrategy = require('passport-jwt').Strategy // for middleware - maybe not needed
const ExtractJwt = require('passport-jwt').ExtractJwt // for middleware  - maybe not needed
const { access_secret } = require("./config") // second one for middleware

const app = express()

// authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, access_secret, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = authenticateToken