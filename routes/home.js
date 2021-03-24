const express = require('express')
const router = express.Router()
const db = require('../db/database.js')

router.get('/', (req, res) => {
  res.render('pages/home')
})

router.post('/newtasktoday', (req, res) => {
  db.one("SELECT id, start_of_day FROM users WHERE id = $1", req.session.userId)
  .then((user) => {
    let hour = Number(user.start_of_day.slice(0, 2))
    let minutes = Number(user.start_of_day.slice(3, 5))

    db.none("INSERT INTO tasks(user_id, task, due_date, created_at) VALUES ($1, $2, now() - INTERVAL '$3 hours $4 minutes', now())", [req.session.userId, req.body.task, hour, minutes])
    .then(() => {
      return res.end()
    })
    .catch((err) => {
      console.log(err)
      res.render('pages/error', {
        err: err
      })
    })
  })
  .catch((err) => {
    console.log(err)
      res.render('pages/error', {
        err: err
      })
  })
})



module.exports = router