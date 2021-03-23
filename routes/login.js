const express = require('express')
const router = express.Router()
const db = require('../db/database.js')
const { compare } = require('bcryptjs')
const { access_secret, refresh_secret } = require("../config")


router.get('/', (req, res) => {
  res.render('pages/login')
})

router.post('/', (req, res) => {
  if (req.body.email === '' || req.body.password === '') throw new Error('Both email and password is required')
  db.oneOrNone("SELECT id, lower(email), password, is_active FROM users WHERE email = $1", req.body.email.toLowerCase())
  .then(async (user) => {
    if (user.is_active === false) throw new Error ('Please confirm your account by clicking on the link in your email inbox.')
    if (user == null) throw new Error('Email or password invalid')
    const passwordsMatch = await compare(req.body.password, user.password)
    if (!passwordsMatch) throw new Error('Email or password invalid')

    req.session.userId = user.id
    return res.redirect('/')
  })
  .catch((err) => {
    console.log(err)
    return res.render('pages/error', {
      err: { message: err }
    })
  })
})


module.exports = router;