import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import { URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, BACKDROP_SIZE_LARGE, API_KEY, URL_DETAIL, BACKDROP_SIZE_ORIGINAL } from '../../actions/const';
// import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMovieDetail, fetchCastList, fetchTrailerList} from '../../actions/actions';

import './Page_Account.scss';


class PageAccount extends React.PureComponent {

    static propTypes = {
        types: PropTypes.array,
    };

    static  defaultProps = {

    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
            types: Object.keys(this.props.accountMovies),
        }
    };

    compMainClass = "PageAccount";

    componentDidMount() {

    };

    componentWillReceiveProps(nextProps) {

    }

    isExists = ( value ) => (value !== undefined && value !== null);
    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);
    currentType = (key) => {
        switch (key) {
            case "watchLater":
                return  'ADD_MOVIE_LATER';
            case "watchFavorites":
                return 'ADD_MOVIE_FAVORITES';
            case "watched":
                return 'ADD_MOVIE_WATCHED';
            default: return null
        };
    };
    currentAction = ( key ) => {
        switch (key) {
            case "watchLater":
                return  'addMovieLater';
            case "watchFavorites":
                return 'addMovieFavorites';
            case "watched":
                return 'addMovieWatched';
            default: return null
        };
    };
    deletedElement = (e) => {
        let currentKey = e.currentTarget.dataset.key;
        let currentMovie = Number(e.currentTarget.dataset.id);
        let newArray = this.props.accountMovies[currentKey].filter( elem  => {
            if( elem.movieValue.id !== currentMovie ) {
                return elem;
            }
        });
        console.warn("filter list", newArray);
        console.warn("filter list", { [ currentKey ]:  newArray });
        this.props.dispatch({
            type: this.currentType(currentKey),
            [ this.currentAction(currentKey) ]: [...newArray],
        })
    };

    __renderLisOfMovies = (list, key) => {
        if( list[key].length !== 0) {
            return (
                list[key].map( ( film ) => {
                    return(
                        <div className = { this.compMainClass + "__element"} key = { film.movieValue.id }>
                            <div className = { this.compMainClass + "__delete" }>
                                <button className = { this.compMainClass + "__delete-button" }
                                        data-key = { key }
                                        data-id = { film.movieValue.id }
                                        onClick = { this.deletedElement }>
                                    Удалить
                                </button>
                            </div>
                            <Link to={'/movie/'+ film.movieValue.id}
                                  className = { this.compMainClass + "__film" }>
                                <div className = { this.compMainClass + "__film_poster" }>
                                    <img src={ URL_IMG + IMG_SIZE_LARGE + film.movieValue.poster_path } alt=""/>
                                </div>
                                <div className = { this.compMainClass + "__film_information" }>
                                    <h2 className = { this.compMainClass + "__film_information-title" }>
                                        { film.movieValue.title }
                                    </h2>
                                    <p className = { this.compMainClass + "__film_information-description" }>
                                        { film.movieValue.overview }
                                    </p>
                                </div>
                            </Link>
                        </div>

                    )
                })
            )
        } else if ( list[key].length === 0 ) {
            return (
                <div className = { this.compMainClass + "__empty-list" }>
                    Нет добавленных фильмов
                </div>
            )
        }

    };

    __renderLists = () => {
        return (

            this.state.types.map ( ( element, index ) => {
                switch (element) {
                    case "watchLater":
                        if(this.props.accountMovies[element] !== undefined) {
                            return(
                                <div className = { this.compMainClass + "__container-watched" } key={ index }>
                                    <h2>Фильмы которые уже посмотрел</h2>
                                    {
                                        this.__renderLisOfMovies( this.props.accountMovies, element )
                                    }
                                </div>
                            );
                        } else return null;

                    case "watchFavorites":
                        if(this.props.accountMovies[element] !== undefined) {
                            return (
                                <div className={ this.compMainClass + "__container-watchLater" }
                                     key={ index }>
                                    <h2>Фильмы которые хочу посмотреть</h2>
                                    {
                                        this.__renderLisOfMovies( this.props.accountMovies, element )
                                    }
                                </div>
                            );
                        } else return null;
                    case "watched":
                        if(this.props.accountMovies[element] !== undefined) {
                            return (
                                <div className={ this.compMainClass + "__container-watchLater" }
                                     key={ index }>
                                    <h2>Избранные фильмы</h2>
                                    {
                                        this.__renderLisOfMovies( this.props.accountMovies, element )
                                    }
                                </div>
                            );
                        } else return null;
                    default: return null;
                }
            })

        )
    };
    render() {

        console.log("STORE", this.props.accountMovies);
        console.log("types", this.state.types);
        // if ( this.state.requestFailed ) return <p>Failed</p>
        // if ( !this.state.getMovieID ) return <p>Loading</p>


        return (
            <div className = { this.compMainClass + "__wrapper"}>
                <div className = { this.compMainClass + "__container container" }>
                    <div className = { this.compMainClass + "__account "}>
                        <div>
                            Профиль: { this.props.accountDetail.accountName }
                        </div>
                    </div>
                    {
                        this.__renderLists()
                    }
                </div>
            </div>
        )
    }

}

export default connect (
    state => ({
        accountMovies: state.myListMovies,
        accountDetail: state.accountDetail,
        // listMovie: state.myListMovies,
    }),
) (PageAccount);
