const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const pool = require('./modules/pool.js');
// const pg = require('pg');
// const config = {
//     host: 'localhost',
//     port: 5432,
//     database: 'weekend_to_do_app',
//     max: 10,
//     idleTimeoutMillis: 30000,
// }
// const pool = pg.Pool(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'))
// pool.on('error', (error) => {
//     console.log('Error with Postgres Pool', error);
// })

//--------------------------------------------------------------------------------->

app.get('/list', (req, res) => {
    pool.query(`SELECT * FROM "to_do_list"`)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error making select query', error);
            res.sendStatus(500);
        });
});

app.post('/list', (req, res) => {
    pool.query(`INSERT INTO "to_do_list" ("task", "complete") 
    VALUES ($1, $2);`, [req.body.task, req.body.complete])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error making select query', error);
            res.sendStatus(500);
        });
});

app.put('/list/:complete/:id', (req, res) => {
    pool.query(`UPDATE "to_do_list" SET "complete"=$1 WHERE "id"=$2;`, [req.params.complete, req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error making PUT', error);
            res.sendStatus(500);
        })
});

app.delete('/list/:id', (req, res) => {
    pool.query(`DELETE FROM "to_do_list" WHERE "id"=$1;`, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error making GET', error);
            res.sendStatus(500);
        });
});

// --------------------------------------------------------------------------------->

app.listen(PORT, () => {
    console.log('Up and running on port', PORT);
});







