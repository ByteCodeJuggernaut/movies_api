import express from 'express';
import bodyParser from 'body-parser';

import * as db from './utils/DataBaseUtils';

db.setUpConnection();

const app = express();

app.use( bodyParser.json() );

app.get('/movieflix', (req, res) => {
    db.listMovies().then(data => res.send(data));
});

app.post('/movieflix', (req, res) => {
    db.addMovies(req.body).then( data => res.send(data) );
});

app.delete('/movieflix/:id', (req, res) => {
    db.deleteMovie(req.params.id).then( data => res.send(data) );
});

const server = app.listen( 8081, () => {
    console.log("Server is up and running on port 8081")
});

