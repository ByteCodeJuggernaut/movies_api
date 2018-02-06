'use strict';

// const mongoose = require ('mongoose');
// import '../models/app_library';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

class MoovieModel {
    // add additional class/instance methods here
}

schema.loadClass(MoovieModel);

const Movieflix = mongoose.model('MoovieModel', schema);

// const Movieflix = mongoose.model('Movieflix');
// export function setUpConnection() {
//     mongoose.connect(`mongodb://localhost/movieflix`)
// }

function listMovies() {
    console.log('calling listMovies');
    return Movieflix.find();
}

function addMovies(data) {
    const moviesList = new Movieflix ({
        watchLater: data.watchLater,
        watchFavorites: data.watchFavorites,
        watched: data.watched,
    });
    return moviesList.save();
}

function deleteMovie(id) {
    return Movieflix.findById(id).remove();
}

module.exports = {
    listMovies,
    addMovies,
    deleteMovie
};
