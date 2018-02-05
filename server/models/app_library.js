import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieflixSchema = new Schema({
    watchLater:         { type: Array },
    watchFavorites:     { type: Array },
    watched:            { type: Array }
});

const Movieflix = mongoose.model('Movieflix', movieflixSchema);

