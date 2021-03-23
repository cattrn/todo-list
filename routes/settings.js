const express = require('express')
const router = express.Router()
const db = require('../db/database.js')

router.get('/', (req, res) => {
  db.one("SELECT * FROM users WHERE id = $1", req.session.userId)
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
  

  
})



module.exports = router