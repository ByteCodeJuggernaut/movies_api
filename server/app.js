const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const dbApi = require('./utils/DataBaseUtils');

// db.setUpConnection();

mongoose.Promise = global.Promise;


const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(bodyParser.json({
    limit: 50000,
    parameterLimit: 200
}));

// 127.0.0.1:8089/movieflix GET type applications/json
app.get('/movieflix', (req, res) => {
    console.log('/movieflix');
    dbApi.listMovies().then(data =>
        res.status(200).json(data));
});

// app.post('/movieflix', (req, res) => {
//     db.addMovies(req.body).then( data => res.send(data) );
// });
//
// app.delete('/movieflix/:id', (req, res) => {
//     db.deleteMovie(req.params.id).then( data => res.send(data) );
// });

mongoose
    .connect(`mongodb://127.0.0.1:27017/movieflix`, {
        useMongoClient: true
    })
    .then(() =>
        http
            .createServer(app)
            .listen(8089, err => {
                if (err) {
                    console.log('error', 'error starting HTTP server:', err);
                    process.exit(1);
                }

                console.log('info', `HTTPS server started.. Port: 8089, env: ${app.get('env')}`);
            }))
    .catch(err => {
        console.log('error', 'database initializing error:', err);
        process.exit(1);
    });

// app.use( bodyParser.json() );
// const server = app.listen( 8081, () => {
//     console.log("Server is up and running on port 8081")
// });

