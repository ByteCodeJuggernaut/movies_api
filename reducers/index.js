import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';

export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';
export const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE';
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SET_POPULAR_MOVIE_LIST = 'SET_POPULAR_MOVIE_LIST';
export const SET_UPCOMING_MOVIE_LIST = 'SET_UPCOMING_MOVIE_LIST';
export const SET_TOP_RATING_MOVIE_LIST = 'SET_TOP_RATING_MOVIE_LIST';
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
    upcomingFilmList:[],
    topRatedFilmList:[],
    error:{}
};

const defaultAccount = {
    accountName: 'Andrey Lebowskiy',
    accountImageUrl: '#',
};

const defaultPrimaryMovieList = {
    isFetching: false,
    dataPrimary:[],
    error:{}
};

const defaultMyMoviesList = {
    watchLater:[
        { movieValue: {
                adult: false,
                backdrop_path: "/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
                belongs_to_collection: null,
                budget: 175000000,
                genres: [
                    {
                        id: 12,
                        name: "приключения"
                    },
                    {
                        id: 16,
                        name: "мультфильм"
                    },
                    {
                        id: 10751,
                        name: "семейный"
                    },
                    {
                        id: 14,
                        name: "фэнтези"
                    }
                ],
                homepage: "",
                id: 354912,
                imdb_id: "tt2380307",
                original_language: "en",
                original_title: "Coco",
                overview: "12-летний Мигель живет в мексиканской деревушке в семье сапожников и тайно мечтает стать музыкантом. Тайно — потому что в его семейном клане музыка считается проклятием. Когда-то его прадед оставил свою жену, прабабку Мигеля, ради мечты, которая теперь не дает спокойно жить Мигелю. С тех пор музыкальная тема в семье стала табу. Мигель обнаруживает, что между ним и его любимым певцом Эрнесто де ла Крусом, ныне покойным, существует некая — пока неназванная — связь. Паренек отправляется к своему кумиру в Страну Мертвых, где встречает души своих предков. Коко знакомится там с духом-трикстером по имени Эктор (в облике скелета), который становится его напарником-проводником. Вдвоем они отправляются на поиски де ла Круса.",
                popularity: 312.989036,
                poster_path: "/lk1sAbyngNwiy0CcOzLRTRiOnaB.jpg",
                production_companies: [
                    {
                        name: "Disney Pixar",
                        id: 6806
                    }
                ],
                production_countries: [
                    {
                        iso_3166_1: "US",
                        name: "United States of America"
                    }
                ],
                release_date: "2017-10-27",
                revenue: 590447385,
                runtime: 109,
                spoken_languages: [
                    {
                        "iso_639_1": "en",
                        "name": "English"
                    },
                    {
                        "iso_639_1": "es",
                        "name": "Español"
                    }
                ],
                status: "Released",
                tagline: "",
                title: "Тайна Коко",
                video: false,
                vote_average: 7.7,
                vote_count: 1792
            }, added: true },
    ],
    watchFavorites: [
        {
            movieValue: {
                adult: false,
                backdrop_path: "/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg",
                belongs_to_collection: {
                    id: 404609,
                    name: "Джон Уик (Коллекция)",
                    poster_path: "/uGhPxTrmT5yASzZrR1oz1ft9UWr.jpg",
                    backdrop_path: "/fSwYa5q2xRkBoOOjueLpkLf3N1m.jpg"
                },
                budget: 20000000,
                genres: [
                    {
                        id: 28,
                        name: "боевик"
                    },
                    {
                        id: 53,
                        name: "триллер"
                    }
                ],
                homepage: "",
                id: 245891,
                imdb_id: "tt2911666",
                original_language: "en",
                original_title: "John Wick",
                overview: "Джон Уик — бывший наемный убийца — ведет размеренную жизнь, когда преступник крадет его любимый Mustang 1969 года и попутно убивает собаку Дейзи, единственное живое напоминание об умершей жене. Жажда мести пробуждает в нем, казалось, утерянную хватку",
                popularity: 426.103321,
                poster_path: "/r7rLaG7ri160xobkDqS3S14YZ1s.jpg",
                production_companies: [
                    {
                        name: "Summit Entertainment",
                        id: 491
                    },
                    {
                        name: "Warner Bros.",
                        id: 6194
                    },
                    {
                        name: "87Eleven",
                        id: 23008
                    },
                    {
                        name: "DefyNite Films",
                        id: 36259
                    },
                    {
                        name: "MJW Films",
                        id: 36433
                    },
                ],
                production_countries: [
                    {
                        iso_3166_1: "CA",
                        name: "Canada"
                    },
                    {
                        iso_3166_1: "CN",
                        name: "China"
                    },
                    {
                        iso_3166_1: "US",
                        name: "United States of America"
                    }
                ],
                release_date: "2014-10-22",
                revenue: 88761661,
                runtime: 94,
                spoken_languages: [
                    {
                        iso_639_1: "hu",
                        name: "Magyar"
                    },
                    {
                        iso_639_1: "en",
                        name: "English"
                    },
                    {
                        iso_639_1: "ru",
                        name: "Pусский"
                    }
                ],
                status: "Released",
                tagline: "Лучше его не трогать",
                title: "Джон Уик",
                video: false,
                vote_average: 7,
                vote_count: 6673,
            },
            added: true
        }
    ],
    watched: [
        { movieValue: {
                adult: false,
                backdrop_path: "/xBKGJQsAIeweesB79KC89FpBrVr.jpg",
                belongs_to_collection: null,
                budget: 25000000,
                genres: [
                    {
                        id: 18,
                        name: "драма"
                    },
                    {
                        id: 80,
                        name: "криминал"
                    }
                ],
                homepage: "",
                id: 278,
                imdb_id: "tt0111161",
                original_language: "en",
                original_title: "The Shawshank Redemption",
                overview: "Фильм удостоен шести номинаций на `Оскар`, в том числе и как лучший фильм года. Шоушенк - название тюрьмы. И если тебе нет еще 30-ти, а ты получаешь пожизненное, то приготовься к худшему: для тебя выхода из Шоушенка не будет! Актриса Рита Хэйворт - любимица всей Америки. Энди Дифрейну она тоже очень нравилась. Рита никогда не слышала о существовании Энди, однако жизнь Дифрейну, бывшему вице-президенту крупного банка, осужденному за убийство жены и ее любовника, Рита Хэйворт все-таки спасла.",
                popularity: 37.983918,
                poster_path: "/sRBNv6399ZpCE4RrM8tRsDLSsaG.jpg",
                production_companies: [
                    {
                        name: "Castle Rock Entertainment",
                        id: 97
                    },
                    {
                        name: "Warner Bros.",
                        id: 6194
                    }
                ],
                production_countries: [
                    {
                        iso_3166_1: "US",
                        name: "United States of America"
                    }
                ],
                release_date: "1994-09-23",
                revenue: 28341469,
                runtime: 142,
                spoken_languages: [
                    {
                        iso_639_1: "en",
                        name: "English"
                    }
                ],
                status: "Released",
                tagline: "«Страх - это кандалы. Надежда - это свобода.»",
                title: "Побег из Шоушенка",
                video: false,
                vote_average: 8.5,
                vote_count: 9389,
            }, added: true }
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

const accountDetail = ( state = defaultAccount, action ) => {
    switch ( action.type ){
        case FETCH_MOVIES:
            return {...state, isFetching:true};
        default:
            return state;
    }
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
            return {...state, isFetching:false, error:null, popularFilmsList: action.dataMoviesPopular};
        case SET_UPCOMING_MOVIE_LIST:
            return {...state, isFetching:false, error:null, upcomingFilmList: action.dataMoviesUpcoming};
        case SET_TOP_RATING_MOVIE_LIST:
            return {...state, isFetching:false, error:null, topRatedFilmList: action.dataMoviesTop};

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
    accountDetail,
    routing: routerReducer

});

export default moviesApi;