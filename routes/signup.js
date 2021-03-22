const express = require('express')
const router = express.Router()
const db = require('../db/database.js')
const { compare, hash } = require('bcryptjs')
const validate = require('../public/js/sharedValidation')
// const passport = require('passport') // needed?
// const cookieParser = require('cookie-parser') // Is this neeeded?

router.get('/', (req, res) => {
  res.render('pages/signup')
})

router.post('/', (req, res) => {
  try {
    if (!validate.emailValid(req.body.email)) throw new Error('Email must be a valid format')
    if (!validate.passwordValid(req.body.password)) throw new Error('Password must be at least 6 characters and include 1 lowercase letter, 1 uppercase letter, and 1 number')
    if (req.body.password !== req.body.confirmPassword) throw new Error('Passwords must match')

    db.oneOrNone("SELECT * FROM users WHERE email = $1", req.body.email)
    .then((user) => {
      if (user !== null) {
        res.render('pages/error', {
          err: { message: 'User already exists please login' }
        })
      } else if (user !== null && user.is_active === false) {
        res.render('pages/error', {
          err: { message: 'User already exists but has not confirmed their email' },
          is_active: false
        })
      }
    })
    .catch((err) => {
      console.log(err)
      // TODO: error processing
    })

    let newUser = {}
    hash(req.body.password, 10, function (err, hash) {
      newUser = {
        email: req.body.email,
        password: hash
      }

      db.none("INSERT INTO users(email, password) VALUES ($1, $2)", [newUser.email, newUser.password])
      .then(() => {
        res.redirect('/login')
      })
      .catch((err) => {
        console.log(err)
        // TODO: error catching
      })
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;

// NEXT: ALTER TABLE TO REMOVE FIRST AND LAST NAMES