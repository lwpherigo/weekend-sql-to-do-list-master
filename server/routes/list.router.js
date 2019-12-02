const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET
router.get('/', (req,res) => {
    pool.query(`SELECT * FROM "list" ORDER BY "id" ASC;`)
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
                        VALUES ('${newItem.task}');`;
    
    pool.query(queryString)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

// PUT
router.put('/:id', (req,res) => {
    const id = req.params.id;
    const complete = req.body.complete;

    let queryString = `UPDATE "list" SET "task"='${complete}' WHERE "id" = $1;`;
    console.log(queryString);
    pool.query(queryString, [id])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

// DELETE
router.delete('/:id', (req,res) => {
    console.log(req.params.id);
    const taskId = req.params.id;
    const queryString = `DELETE FROM "list" WHERE "id" = ${taskId};`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});

module.exports = router;