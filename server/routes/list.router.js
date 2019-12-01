const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET
router.get('/', (req,res) => {
    pool.query(`SELECT * "list" ORDER BY "id" ASC;`)
    .then((response) => {
        res.send(response.rows);
        console.log('get sent from server')
    })
    .catch((err) => {
        res.sendStatus(500);
    });
});

// POST 
router.post('/', (req,res) => {
    const newItem = req.body;
    console.log(newItem);
    const queryString = `INSERT INTO "list" ("task")
                        VALUES ('${newItem.item}');`;
    
    pool.query(queryString)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

// DELETE

module.exports = router;