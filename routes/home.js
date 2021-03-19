const express = require('express');
const router = express.Router();
const db = require('../db/database.js');

router.get('/', (req, res) => {
  res.render('pages/home')
})

router.post('/newtask', (req, res) => {
  db.none('INSERT INTO tasks(user_id, task, due_date, created_at) VALUES ($1, $2, $3, now())', [1, req.body.task])
  .then(() => {
    return res.end()
  })
  .catch((err) => {
    // error page
  })
})

router.get('/alltasks', (req, res) => {
  db.any('SELECT * FROM tasks')
  .then((tasks) => {
    res.json(tasks)
  })
  .catch((err) => {
    // error page
  })    
})



module.exports = router;