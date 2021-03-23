const express = require('express');
const router = express.Router();
const db = require('../db/database.js');
const passport = require('passport')

router.get('/', (req, res) => {
  res.render('pages/home')
})

router.post('/newtask', (req, res) => {
  db.none("INSERT INTO tasks(user_id, task, due_date, created_at) VALUES (1, $1, TO_TIMESTAMP($2, 'YYYY-MM-DD'), now())", [req.body.task, req.body.due_date])
  .then(() => {
    console.log('Successful')
    return res.end()
  })
  .catch((err) => {
    console.log(err)
    res.render('pages/error', {
      err: err
    })
  })
})

router.get('/alltasks', (req, res) => {
  db.any("SELECT user_id, task, TO_CHAR(due_date, 'DD Mon') due_date FROM tasks")
  .then((tasks) => {
    res.json(tasks)
  })
  .catch((err) => {
    console.log(err)
  })    
})



module.exports = router;