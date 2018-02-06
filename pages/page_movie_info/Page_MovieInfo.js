import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import { URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, BACKDROP_SIZE_LARGE, API_KEY, URL_DETAIL, BACKDROP_SIZE_ORIGINAL } from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';

import { fetchMovieDetail, fetchCastList, fetchTrailerList} from '../../actions/actions';

import './Page_MovieInfo.scss';


class PageMovieInfo extends React.PureComponent {

    static propTypes = {
        listFavorites:          PropTypes.array,
        listLater:              PropTypes.array,
        listWatched:            PropTypes.array,
        addToLater:             PropTypes.bool,
    };

    static  defaultProps = {
        addToLater:     false,
        addToFavorites: false,
        addToWatched:   false,
    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
            listLater: this.props.listMovie.watchLater,
            listFavorites: this.props.listMovie.watchFavorites,
            listWatched: this.props.listMovie.watched,
            movieID: this.props.match.params.id,
            requestFailed: false,
        }
    };

    compMainClass = "PageMovieInfo";

    componentDidMount() {
        let url = URL_DETAIL + this.state.movieID + API_KEY + LANGUAGE;
        isoFetch( url )
            .then( response => {
                if ( !response.ok ) {
                    throw Error( "Ошибка запроса" )
                }
                return response;
            } )
            .then( data => data.json() )
            .then( data => {
                this.setState( {
                    getMovieID: data,
                }, () => {
                    // console.log( "getMovieID", this.state.getMovieID );
                    this.props.dispatch({
                        type: "SET_RECENT_MOVIES",
                        movieDetail: this.state.getMovieID,
                    })
                } );
            }, () => {
                this.setState( {
                    requestFailed: true,
                } )
            } )

    };

    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props.match;
        if(nextProps.match.params.id && this.props.match.params.id !== nextProps.match.params.id) {
            dispatch(fetchMovieDetail(nextProps.match.params.id));
        }
    }

    isExists = ( value ) => (value !== undefined && value !== null);

    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);

    setToListLate = (e) => {
        let addedMovie = e.currentTarget.dataset.added;
        let copyListLater = [...this.state.listLater];
        console.log("list later", copyListLater);
        let currentMovie = {...this.props.movieDetail.recentMovies};

        let idMovie = currentMovie.id;
        if ( addedMovie === "true") {
            let newListLater = copyListLater.filter( ( movie ) => {
               if ( movie.movieValue.id !== idMovie) {
                   return movie;
               }
            });
            this.setState({
                addToLater: false,
                listLater: newListLater,
            }, () => {
                this.props.dispatch({
                    type: "DELETE_MOVIE_LATER",
                    addMovieLater: this.state.listLater,
                })
            })
        } else {
            console.log('false');
            let movie = {
                movieValue: currentMovie,
                added: true,
            };

            let newList = [...this.state.listLater];
            for( let i = 0; i < newList.length; i++) {
                if( newList[i].movieValue.id ===  this.state.getMovieID.id) {
                    return null;
                } else {
                    newList.push(movie);
                    break;
                }
            }

            this.setState({
                listLater: [...newList],
                addToLater: true,
            }, () => {
                this.props.dispatch({
                    type: "ADD_MOVIE_LATER",
                    addMovieLater: this.state.listLater,
                })
            });
        }

    };

    setToListFavorites = (e) => {
        let addedMovie = e.currentTarget.dataset.added;
        let copyList = [...this.state.listFavorites];
        let currentMovie = {...this.props.movieDetail.recentMovies};

        let idMovie = currentMovie.id;
        if ( addedMovie === "true") {
            let newList = copyList.filter( ( movie ) => {
                if ( movie.movieValue.id !== idMovie) {
                    return movie;
                }
            });
            this.setState({
                addToFavorites: false,
                listFavorites: [...newList],
            }, () => {
                this.props.dispatch({
                    type: "DELETE_MOVIE_FAVORITES",
                    addMovieFavorites: this.state.listFavorites,
                })
            })
        } else {

            let movie = {
                movieValue: currentMovie,
                added: true,
            };
            let newList = [...this.state.listFavorites];
            for( let i = 0; i < newList.length; i++) {
                if( newList[i].movieValue.id ===  this.state.getMovieID.id) {
                    return null;
                } else {
                    newList.push(movie);
                    break;
                }
            }
            this.setState({
                listFavorites: [...newList],
                addToLater: true,
            }, () => {
                this.props.dispatch({
                    type: "ADD_MOVIE_FAVORITES",
                    addMovieFavorites: this.state.listFavorites,
                })
            });
        }

    };

    setToListWatched = (e) => {
        let addedMovie = e.currentTarget.dataset.added;
        let copyList = [...this.state.listWatched];
        let currentMovie = {...this.props.movieDetail.recentMovies};

        let idMovie = currentMovie.id;
        if ( addedMovie === "true") {
            let newList = copyList.filter( ( movie ) => {
                if ( movie.movieValue.id !== idMovie) {
                    return movie;
                }
            });
            this.setState({
                addToWatched: false,
                listWatched: [...newList],
            }, () => {
                this.props.dispatch({
                    type: "DELETE_MOVIE_WATCHED",
                    addMovieWatched: this.state.listWatched,
                })
            })
        } else {
            let newMovie = {
                movieValue: currentMovie,
                added: true,
            };
            let newList = [...this.state.listWatched];
            for( let i = 0; i < newList.length; i++) {
                if( newList[i].movieValue.id ===  this.state.getMovieID.id) {
                    return null;
                } else {
                    newList.push(newMovie);
                    break;
                }
            }
            this.setState({
                listWatched: [...newList],
                addToWatched: true,
            }, () => {
                this.props.dispatch({
                    type: "ADD_MOVIE_WATCHED",
                    addMovieWatched: this.state.listWatched,
                })
            });
        }

    };

    checkedMovieInListLater = () => {
        let watchLater = [...this.state.listLater];
        let addedMovie;
        for( let i = 0; i < watchLater.length; i++) {
            if( watchLater[i].movieValue.id ===  this.state.getMovieID.id) {
                addedMovie = true;
                break;
            } else {

                addedMovie = false;
            }
        }
        return addedMovie;
    };

    checkedMovieInListFavorites = () => {
        let copyList = [...this.state.listFavorites];
        let addedMovie;
        for( let i = 0; i < copyList.length; i++) {
            if( copyList[i].movieValue.id ===  this.state.getMovieID.id) {
                addedMovie = true;
                break;
            } else {

                addedMovie = false;
            }
        }
        return addedMovie;
    };

    checkedMovieInListWatched = () => {
        let copyList = [...this.state.listWatched];
        let addedMovie;
        for( let i = 0; i < copyList.length; i++) {
            if( copyList[i].movieValue.id ===  this.state.getMovieID.id) {
                addedMovie = true;
                break;
            } else {

                addedMovie = false;
            }
        }
        return addedMovie;
    };

    render() {
        let movieDetail = {...this.props.movieDetail.recentMovies};
        let urlBackground = URL_IMG + BACKDROP_SIZE_ORIGINAL + movieDetail.backdrop_path;
        let styleSlide = {
            background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.9) 100%)," +  "url(" + urlBackground + ")" + " no-repeat center center fixed",
        };
        console.log("STORE", this.props);
        console.log("movie detail", this.state.movieDetail);

        if ( this.state.requestFailed ) return <p>Failed</p>
        if ( !this.state.getMovieID ) return <p>Loading</p>
        return (
            <div className = { this.compMainClass + "__wrapper"} style={ styleSlide }>
                <Grid className = { this.compMainClass + "__container" }>
                    <Row className = { this.compMainClass + "__row"}>
                        <div className = { this.compMainClass + "__left-column"}>
                            <img className = { this.compMainClass + "__left-column_poster"}
                                 src={ URL_IMG + IMG_SIZE_LARGE + movieDetail.poster_path }
                                 alt=""/>
                        </div>
                        <div className = { this.compMainClass + "__right-column"}>
                            <div className = { this.compMainClass + "__title"}>
                                { movieDetail.title }
                            </div>
                            <blockquote  className = { this.compMainClass + "__quote"}>
                                { movieDetail.tagline }
                            </blockquote >
                            <div className = { this.compMainClass + "__inline-block"}>
                                <div className = { this.compMainClass + "__data-release"}>
                                    <div className = { this.compMainClass + "__inline-block_icon"}>
                                        <img src="/images/calendar-flat.png" alt=""/>
                                    </div>
                                    <p className = { this.compMainClass + "__inline-block_text"}>
                                        { (movieDetail.release_date !== undefined) ? movieDetail.release_date.substring(0,4) : null }
                                    </p>
                                </div>
                                <div className = { this.compMainClass + "__votes"}>
                                    <div className = { this.compMainClass + "__inline-block_icon"}>
                                        <img src="/images/rating-icon.png" alt=""/>
                                    </div>
                                    <p className = { this.compMainClass + "__inline-block_text"}>
                                        { movieDetail.vote_average } 
                                    </p>
                                </div>
                                <div className = { this.compMainClass + "__votes-count"}>
                                    <div className = { this.compMainClass + "__inline-block_icon"}>
                                        <img src="/images/likes-icon.png" alt=""/>
                                    </div>
                                    <p className = { this.compMainClass + "__inline-block_text"}>
                                        { movieDetail.vote_count }
                                    </p>
                                </div>
                            </div>
                            <div className = { this.compMainClass + "__description"}>
                                { movieDetail.overview }
                            </div>
                            <div className = { this.compMainClass + "__block-button"}>
                                <a data-added = { this.checkedMovieInListLater() }
                                        className = { this.compMainClass + "__button" + " " + (this.checkedMovieInListLater() ? "later-active" : "later") }
                                   onClick={ this.setToListLate }><i></i>Хочу посмотреть</a>
                                <a data-added = { this.checkedMovieInListFavorites() }
                                        className = { this.compMainClass + "__button" + " " + (this.checkedMovieInListFavorites() ? "favorites-active" : "favorites")}
                                        onClick={ this.setToListFavorites }><i></i>Добавить в избранное</a>
                                <a data-added = { this.checkedMovieInListWatched() }
                                        className = { this.compMainClass + "__button" + " " + (this.checkedMovieInListWatched() ? "watched-active" : "watched")}
                                        onClick={ this.setToListWatched }><i></i>Смотрел</a>
                            </div>
                        </div>
                    </Row>
                    <Row className = { this.compMainClass + "__row"}>
                        <div>
                            Actors
                        </div>
                    </Row>

                </Grid>
            </div>
        )
    }

}

export default connect (
    state => ({
        movieDetail: state.recentMoviesList,
        listMovie: state.myListMovies,
    }),
) (PageMovieInfo);
