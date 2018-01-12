import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';

export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';
export const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE';
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SET_MOVIE_LIST = 'SET_MOVIE_LIST';


const defaultStateList = {
    isFetching: false,
    items:[],
    error:{}
};

const defaultMenuList = {
    menuList: [
        'Главная',
        'Фильмы',
        'Сериалы',
        'Информация'
    ]
};

const menuList = ( state = defaultMenuList, action ) => {
    switch ( action.type ) {
        default:
            return state;
    }
};

const movieList = (state = defaultStateList, action) => {
    switch (action.type){
        case FETCH_MOVIES:
            return {...state, isFetching:true};
        case FETCH_MOVIES_SUCCESS:
            return {...state, isFetching:false, items:action.data};
        case FETCH_MOVIES_FAILURE:
            return {...state, isFetching:false, error:action.data};
        case SET_MOVIE_LIST:
            return {...state, isFetching:true, error:null, items: action.dataMovies};
        default:
            return state;
    }
};

const moviesApi = combineReducers({
    movieList,
    menuList,
    routing: routerReducer

});

export default moviesApi;