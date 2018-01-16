import {URL_LIST, LANGUAGE, SORT_POPULARITY, API_KEY, API_KEY_ALT} from './const';


function fetchMoviesSuccess(data) {
    return {
        type: FETCH_MOVIES_SUCCESS,
        data
    };
}

function fetchMoviesFail(error) {
    return {
        type: FETCH_MOVIES_FAILURE,
        error
    };
}

function fetchMovie() {
    return {
        type: FETCH_MOVIE
    };
}


export function fetchMovieDetail(id){
    const url_movie = URL_DETAIL + id + API_KEY;
    return function(dispatch){
        dispatch(fetchMovie())
        return fetch(url_movie)
            .then(response => response.json())
            .then(data => dispatch(fetchMovieSuccess(data)))
            .catch(error => dispatch(fetchMovieFail(error)))
    }
}

export function fetchMovieList(option){
    let url;
    if(option) {
        url = URL_LIST + API_KEY + LANGUAGE + SORT_POPULARITY + option;
    } else url = URL_LIST + API_KEY + LANGUAGE + SORT_POPULARITY;
    return function(dispatch){
        dispatch(fetchMovies());
        return fetch(url)
            .then( response => response.json() )
            .then( json => json.results )
            .then( data => dispatch( fetchMoviesSuccess(data) ) )
            .catch( error => dispatch( fetchMoviesFail(error) ) )
    }
}