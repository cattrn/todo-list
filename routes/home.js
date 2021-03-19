const express = require('express');
const router = express.Router();
const db = require('../db/database.js');


router.get('/', (req, res) => {
    db.any('SELECT * FROM tasks')
    .then((tasks) => {
        res.render('pages/home', {
            tasks: tasks
        })
    })
    .catch((err) => {
        // error page
    })    
})

module.exports = router;