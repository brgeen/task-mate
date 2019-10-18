const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const pg = require('pg');
const config = {
    host: 'localhost',
    port: 5432,
    database: 'weekend_to_do_app',
    max: 10,
    idleTimeoutMillis: 30000,
}
const pool = pg.Pool(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'))
pool.on('error', (error) => {
    console.log('Error with Postgres Pool', error);
})

//--------------------------------------------------------------------------------->


// --------------------------------------------------------------------------------->

app.listen(PORT, () => {
    console.log('Up and running on port', PORT);
});







