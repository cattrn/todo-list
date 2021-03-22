const express = require('express')
const router = express.Router()
const db = require('../db/database.js')
const jwt = require('jsonwebtoken')
const { compare } = require('bcryptjs')
const { access_secret, refresh_secret } = require("../config")
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
// const cookieParser = require('cookie-parser') // Is this neeeded?
// const { response } = require('express') // Is this neeeded?


// router.use(express.urlencoded({ extended: true }))
// router.use(express.json())

router.post('/refresh_token', async (req, res) => {
  // provide refresh token, receive access token AND new refresh token
  try {
    if (!req.cookies.rtok) throw new Error('No rtok')
    const jwtPayload = jwt.verify(req.cookies.rtok, refresh_secret)
    db.oneOrNone("SELECT * FROM users WHERE id = $1", jwtPayload.sub)
    .then((user) => {
    
      // const user = await client.user.findUnique({
      //   where: {
      //     id: jwtPayload.sub
      //   },
      //   select: {
      //     email: true,
      //     name: true,
      //     id: true
      //   }
      // })

      if (user == null) throw new Error('No such user')

      const accessToken = jwt.sign({ sub: user.id }, access_secret, { expiresIn: '15m' })
      const refreshToken = jwt.sign({ sub: user.id }, refresh_secret, { expiresIn: '7d' })

      res.cookie("rtok", refreshToken, { httpOnly: true })
      res.json({ accessToken: accessToken })
    })
    .catch((err) => {
      console.log(err)
      // TODO: error catching
    })
  } catch (error) {
    res.status(401).json({ ok: false, error: error.message })
  }
})

router.get('/', (req, res) => {
  res.render('pages/login')
})

router.post('/', (req, res) => {
  db.oneOrNone("SELECT * FROM users WHERE email = $1", req.body.email)
  .then(async (user) => {
    if (user == null) throw new Error('Email or password invalid')
    const passwordsMatch = await compare(req.body.password, user.password)
    if (!passwordsMatch) throw new Error('Email or password invalid')

    const accessToken = jwt.sign({ sub: user.id }, access_secret, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ sub: user.id }, refresh_secret, { expiresIn: '7d' })

    res.cookie("rtok", refreshToken, { httpOnly: true })
    res.cookie("atok", accessToken)
    // localStorage.setItem('accessToken', accessToken)
    res.redirect('/')
    // res.json({ accessToken: accessToken })
  })
  .catch((error) => {
    console.log(error)
    res.status(401).json({
      ok: false,
      error: error.message
    })
  })
})


module.exports = router;