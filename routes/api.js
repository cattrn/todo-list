const express = require('express')
const router = express.Router()
const db = require('../db/database')

router.get('/todaystasks', (req, res) => {
  db.any("SELECT id, user_id, task, due_date, complete FROM tasks WHERE user_id = $1 AND due_date = CURRENT_DATE", req.session.userId)
  .then((tasks) => {
    res.json(tasks)
  })
  .catch((err) => {
    console.log(err)
    // TODO: error catch
  })
})

router.get('/alltasks', (req, res) => {
  db.any("SELECT id, user_id, task, TO_CHAR(due_date, 'DD Mon') due_date, complete FROM tasks WHERE user_id = $1", req.session.userId)
  .then((tasks) => {
    res.json(tasks)
  })
  .catch((err) => {
    console.log(err)
    // TODO: error catch
  })
})

router.put('/completetask', (req, res) => {
  db.none("UPDATE tasks SET complete = $1 WHERE id = $2 AND user_id = $3", [req.body.complete, req.body.id, req.session.userId])
  .then(() => {
    res.end()
  })
  .catch((err) => {
    console.log(err)
    // TODO: error catching
  })
})

router.delete('/deletetasks', (req, res) => {
  db.none("DELETE FROM tasks WHERE user_id = $1 AND complete = true", req.session.userId)
  .then(() => {
    res.end()
  })
  .catch((err) => {
    console.log(err)
    // TODO: error catching
  })
})

module.exports = router