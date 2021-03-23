const express = require('express')
const router = express.Router()
const db = require('../db/database.js')
const { hash } = require('bcryptjs')
const crypto = require('crypto')
const cron = require("node-cron")
const validate = require('../public/js/sharedValidation')
const { emailConfirmation } = require('../nodemailerEmails.js')

router.get('/', (req, res) => {
  res.render('pages/signup')
})

router.post('/', (req, res) => {
  try {
    if (req.body.email === '') throw new Error ('Please include email')
    if (req.body.password === '') throw new Error ('Please include password')
    if (!validate.emailValid(req.body.email)) throw new Error('Email must be a valid format')
    if (!validate.passwordValid(req.body.password)) throw new Error('Password must be at least 6 characters and include 1 lowercase letter, 1 uppercase letter, and 1 number')
    if (req.body.password !== req.body.confirmPassword) throw new Error('Passwords must match')

    db.oneOrNone("SELECT * FROM users WHERE email = $1", req.body.email)
    .then((user) => {
      if (user !== null && user.is_active === true) {
        return res.render('pages/error', {
          err: { message: 'User already exists please login' }
        })
      } else if (user !== null && user.is_active === false) {
        return res.render('pages/error', {
          err: { message: 'User already exists but has not confirmed their email' },
          is_active: false
        })
      }
    })
    .catch((err) => {
      console.log(err)
      return res.render('pages/error', {
        err: { message: err }
      })
    })

    let newUser = {}
    hash(req.body.password, 10, function (err, hash) {
      newUser = {
        email: req.body.email.toLowerCase(),
        password: hash
      }

      db.none("INSERT INTO users(email, password) VALUES ($1, $2)", [newUser.email, newUser.password])
      .then(() => {
        const confirmationHash = crypto.randomBytes(30).toString("hex")
        db.none("INSERT INTO email_confirmation(email, hash) VALUES ($1, $2)", [newUser.email, confirmationHash])
        .then(() => {
          emailConfirmation(newUser, confirmationHash)
        })
        .catch((err) => {
          console.log(err)
          return res.render("pages/error", {
            err: { message: err }
          })
        })
      })
      .then(() => {
        return res.render('pages/signupConfirmation', {
          message: 'To start getting shit done, check your email to confirm your account.'
        })
      })
      .catch((err) => {
        console.log(err)
        return res.render('pages/error', {
          err: { message: err }
        })
      })
    })
  } catch (err) {
    console.log(err)
    return res.render('pages/error', {
      err: { message: err }
    })
  }
})

router.get("/resend", (req, res) => {
  const email = req.query.email

  db.oneOrNone("SELECT email, is_active FROM users WHERE email = $1", email)
    .then((user) => {
      if (user === null) throw new Error ('No such user in the database, please sign up.')
      if (user.is_active === true) throw new Error ('You have already confirmed your email, please log in.')
      
      db.none("DELETE FROM email_confirmation WHERE email = $1", email)
      .then(() => {
        const confirmationHash = crypto.randomBytes(30).toString("hex")

        db.none("INSERT INTO email_confirmation(email, hash) VALUES ($1, $2)", [email, confirmationHash])
          .then(() => {
            let newUser = { email: email }
            emailConfirmation(newUser, confirmationHash)
          })
          .catch((err) => {
            return res.render("pages/error", {
              err: { message: err },
            })
          })
      })
      .then(() => {
        return res.render("pages/signupConfirmation", {
          message: 'To start getting shit done, check your email to confirm your account.'
        })
      })
      .catch((err) => {
        return res.render("pages/error", {
          err: err,
        })
      })
    })
    .catch((err) => {
      return res.render("pages/error", {
        err: err,
      })
    })
})

// Delete hashes after 48 hours - this runs at midnight every day
cron.schedule("0 0 * * *", () => {
  db.any("SELECT * FROM email_confirmation").then((rows) => {
    if (rows.length > 0) {
      db.none("DELETE FROM email_confirmation WHERE create_at < now() - interval '2 days'")
        .then(() => {
          console.log("Cron job run: hash check")
        })
        .catch(() => {
          console.log("Cron tried to delete hash and it didn't work.")
        })
    }
  })
})

module.exports = router