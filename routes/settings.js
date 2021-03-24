const express = require('express')
const router = express.Router()
const db = require('../db/database.js')

router.get('/', (req, res) => {
  db.one("SELECT id, email, TO_CHAR(start_of_day, 'HH24:MI') start_of_day FROM users WHERE id = $1", req.session.userId)
  .then((user) => {
    res.render('pages/settings', {
      user: user
    })
  })
  .catch((err) => {
    console.log(err)
    // TODO: error catching
  })
})

router.post('/', (req, res) => {
  db.none("UPDATE users SET start_of_day = $1 WHERE id = $2", [req.body['start-of-day'], req.session.userId])
  .then(() => {
    res.redirect('/settings')
  })
  .catch((err) => {
    console.log(err)
    // TODO: error catching
  })
})



module.exports = router