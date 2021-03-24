const express = require('express')
const router = express.Router()
const db = require('../db/database.js')

router.get('/', (req, res) => {
  res.render('pages/addTask')
})

router.post('/', (req, res) => {
  if (req.body['task-type'] === 'One-off task') {
    db.none("INSERT INTO tasks(user_id, task, due_date, created_at) VALUES ($1, $2, $3, now())", [req.session.userId, req.body.task, req.body.date])
    .then(() => {
      res.redirect('/alltasks')
    })
    .catch((err) => {
      console.log(err)
      // TODO: error catching
    })
  } else if (req.body['task-type'] === 'Recurring task') {
    // TODO: recurring task post
  }
  
})



module.exports = router