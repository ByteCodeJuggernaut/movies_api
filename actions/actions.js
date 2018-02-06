import {URL_LIST, LANGUAGE, SORT_POPULARITY, API_KEY, URL_DETAIL, API_KEY_ALT} from './const';

import { default as isoFetch } from 'isomorphic-fetch';

import {FETCH_MOVIES, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE,
    FETCH_MOVIE, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE,
    FETCH_STAR_SUCCESS, FETCH_STAR_FAILURE,
    FETCH_CASTS, FETCH_CASTS_SUCCESS, FETCH_CASTS_FAILURE,
    FETCH_TRAILERS, FETCH_TRAILERS_SUCCESS, FETCH_TRAILERS_FAILURE,
    SEARCH_MOVIE, SEARCH_MOVIE_SUCCESS, SEARCH_MOVIE_FAILURE,
    ENTER_SEARCH_TEXT} from '../actions/actions'


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
function fetchMovieSuccess(data) {
    return {
        type: FETCH_MOVIE_SUCCESS,
        data
    };
}

function fetchMovieFail(error) {
    return {
        type: FETCH_MOVIE_FAILURE,
        error
    };
}


export function fetchMovieDetail(id){
    let url = URL_DETAIL + id + API_KEY + LANGUAGE;
    isoFetch( url )
        .then( response => {
            if ( !response.ok ) {
                throw Error( "Ошибка запроса" )
            }
            return response;
        } )
        .then( data => data.json() )
        .then( data => fetchMovieSuccess(data) )
        .catch(error => fetchMovieFail(error))

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

// !!!! returns films
//127.0.0.1:8089/movieflix GET type applications/json
// fetch(params) !!!GET !!!JSON
//.json()
//

const apiUrl1 = 'http://localhost:8089/movieflix';
const opts = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
};

const apiFetch = () => {
    console.warn('apiFetch');
    return isoFetch(apiUrl1, opts)
        .then(response => {
            console.warn('apiFetch2', response);
            if (!response.ok ) {
                throw Error( "Ошибка запроса" )
            }
            console.warn('apiFetch');
            return response;
        })
        .then(data => data.json());
}


export const getMovies = () => dispatch => {
    console.warn('getMovies1');
    dispatch(fetchMovie()); // fetcing: true
    console.warn('getMovies2');
    apiFetch().then(fetchMoviesSuccess).catch(fetchMovieFail);
}

// postData =
// export getFilms() {
//dispatch(startFetchFilsh());
//apiFetchFilms()
//dispatch(finishFetchFilms())
// }