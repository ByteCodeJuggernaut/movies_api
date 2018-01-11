import {URL_LIST, LANGUAGE, SORT_POPULARITY, API_KEY, API_KEY_ALT} from './const';

export function fetchMovieList(option){
    let url;
    if(option) {
        url = URL_LIST + API_KEY + LANGUAGE + SORT_POPULARITY + '&with_cast=' + option;
    } else url = URL_LIST + API_KEY;
    return function(dispatch){
        dispatch(fetchMovies());
        return fetch(url)
            .then(response => response.json())
            .then(json => json.results)
            .then(data => dispatch(fetchMoviesSuccess(data)))
            .catch(error => dispatch(fetchMoviesFail(error)))
    }
}