import mongoose from 'mongoose';

import '../models/app_library';

const Movieflix = mongoose.model('Movieflix');

export function setUpConnection() {
    mongoose.connect(`mongodb://localhost/movieflix`)
}

export function listMovies() {
    return Movieflix.find();
}

export function addMovies(data) {
    const moviesList = new Movieflix ({
        watchLater: data.watchLater,
        watchFavorites: data.watchFavorites,
        watched: data.watched,
    });
    return moviesList.save();
}

export function deleteMovie(id) {
    return Movieflix.findById(id).remove();
}