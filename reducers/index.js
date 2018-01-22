import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';

export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';
export const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE';
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SET_POPULAR_MOVIE_LIST = 'SET_POPULAR_MOVIE_LIST';
export const SET_MOVIE_TODAY_LIST = 'SET_MOVIE_TODAY_LIST';
export const SET_RECENT_MOVIES = 'SET_RECENT_MOVIES';
export const FETCH_MOVIE = 'FETCH_MOVIE';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';
export const ADD_MOVIE_LATER = 'ADD_MOVIE_LATER';
export const DELETE_MOVIE_LATER = 'DELETE_MOVIE_LATER';
export const ADD_MOVIE_FAVORITES = 'ADD_MOVIE_FAVORITES';
export const DELETE_MOVIE_FAVORITES = 'DELETE_MOVIE_FAVORITES';
export const DELETE_MOVIE_WATCHED = 'DELETE_MOVIE_WATCHED';
export const ADD_MOVIE_WATCHED = 'ADD_MOVIE_WATCHED';



const defaultMovieList = {
    isFetching: false,
    popularFilmsList:[],
    error:{}
};

const defaultPrimaryMovieList = {
    isFetching: false,
    dataPrimary:[],
    error:{}
};

const defaultMyMoviesList = {
    watchLater:[
        { movieValue: {id: 346364}, added: true },
        { movieValue: {id: 353486}, added: true },

    ],
    watchFavorites: [
        { movieValue: {id: 346364}, added: true },
        { movieValue: {id: 353486}, added: true },
    ],
    watched: [
        { movieValue: {id: 346364}, added: true },
        { movieValue: {id: 353486}, added: true },
    ]
};

const defaultRecentMovie = {
    isFetching: false,
    recentMovies:{},
    error:{}
};

const defaultMenuList = {
    menuList: [
        {
            title: 'Главная',
            linkTo: '/',
        },
        {
            title: 'Лучший выбор',
            linkTo: '/bestchoosefilms',
        },
        {
            title: 'Мой список',
            linkTo: '/mylist',
        },
        {
            title: 'Недавние',
            linkTo: '/recently',
        },
    ]
};

const menuList = ( state = defaultMenuList, action ) => {
    switch ( action.type ) {
        default:
            return state;
    }
};

const movieList = (state = defaultMovieList, action) => {
    switch (action.type){
        case FETCH_MOVIES:
            return {...state, isFetching:true};
        case FETCH_MOVIES_SUCCESS:
            return {...state, isFetching:false, items:action.data};
        case FETCH_MOVIES_FAILURE:
            return {...state, isFetching:false, error:action.data};
        case SET_POPULAR_MOVIE_LIST:
            return {...state, isFetching:true, error:null, popularFilmsList: action.dataMovies};

        default:
            return state;
    }
};

const primaryMovieList = ( state = defaultPrimaryMovieList, action ) => {
    switch ( action.type ){
        case SET_MOVIE_TODAY_LIST:
            return {...state, isFetching:true, error:null, dataPrimary: action.dataPrimary};
        default:
            return state;
    }
};

const recentMoviesList = ( state = defaultRecentMovie, action ) => {
    switch ( action.type ){
        case SET_RECENT_MOVIES:
            return {...state, isFetching:true, error:null, recentMovies: action.movieDetail};
        default:
            return state;
    }
};

const movieDetail = (state = defaultRecentMovie, action) => {
    switch (action.type){
        case FETCH_MOVIE:
            return Object.assign({}, state, {
                isFetching:true
            });
        case FETCH_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                isFetching:false,
                recentMovies:action.data
            });
        case FETCH_MOVIE_FAILURE:
            return Object.assign({}, state, {
                isFetching:false,
                error:action.data
            });
        default:
            return state;
    }
};

const myListMovies = ( state = defaultMyMoviesList, action ) => {
    switch (action.type) {
        case ADD_MOVIE_LATER:
            return { ...state, watchLater: action.addMovieLater };
        case DELETE_MOVIE_LATER:
            return { ...state, watchLater: action.addMovieLater };
        case ADD_MOVIE_FAVORITES:
            return { ...state, watchFavorites: action.addMovieFavorites };
        case DELETE_MOVIE_FAVORITES:
            return { ...state, watchFavorites: action.addMovieFavorites };
        case ADD_MOVIE_WATCHED:
            return { ...state, watched: action.addMovieWatched };
        case DELETE_MOVIE_WATCHED:
            return { ...state, watched: action.addMovieWatched };
        default:
            return state;
    }
};

const moviesApi = combineReducers({
    movieList,
    menuList,
    primaryMovieList,
    recentMoviesList,
    movieDetail,
    myListMovies,
    routing: routerReducer

});

export default moviesApi;