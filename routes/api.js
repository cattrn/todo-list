const express = require('express')
const router = express.Router()
const db = require('../db/database')

router.get('/todaystasks', (req, res) => {
  db.one("SELECT id, start_of_day FROM users WHERE id = $1", req.session.userId)
  .then((user) => {
    let hours = Number(user.start_of_day.slice(0, 2))
    let minutes = Number(user.start_of_day.slice(3, 5))

    db.any("SELECT id, user_id, task, date_trunc('day', due_date) due_date, complete FROM tasks WHERE user_id = $1 AND due_date = date_trunc('day', (now() - INTERVAL '$2 hours $3 minutes')) ORDER BY complete ASC, task ASC", [req.session.userId, hours, minutes])
    .then((tasks) => {
      res.json(tasks)
    })
    .catch((err) => {
      console.log(err)
      // TODO: error catch
    })
  })
  .catch((err) => {
    console.log(err)
      // TODO: error catch
  })
})

router.get('/alltasks', (req, res) => {
  db.any("SELECT id, user_id, task, TO_CHAR(due_date, 'DD Mon') due_date, complete FROM tasks WHERE user_id = $1 ORDER BY due_date ASC, complete ASC, task ASC", req.session.userId)
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