const express = require('express')
const router = express.Router()
const db = require('../db/database.js')

router.get('/', (req, res) => {
  res.render('pages/home')
})

router.post('/newtasktoday', (req, res) => {
  db.none("INSERT INTO tasks(user_id, task, due_date, created_at) VALUES ($1, $2, date_trunc('day', now()), now())", [req.session.userId, req.body.task])
  .then(() => {
    res.end()
  })
  .catch((err) => {
    console.log(err)
    res.render('pages/error', {
      err: err
    })
  })
})



module.exports = router