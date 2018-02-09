import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import { URL_LIST, LANGUAGE, URL_SIMILAR, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, BACKDROP_SIZE_LARGE, API_KEY, URL_DETAIL, BACKDROP_SIZE_ORIGINAL, URL_CAST, URL_VIDEO, CAST_MAX_NUM, URL_YOUTUBE, TRAILER_MAX_NUM } from '../../actions/const';
// import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';

import { fetchMovieDetail, fetchCastList, fetchTrailerList} from '../../actions/actions';

import CastList from '../../components/complex/CastList';
import SimilarFilm from '../../components/primitive/SimilarFilm';
import Modal from 'react-modal';
import './Page_MovieInfo.scss';


const fetchApiData = ({actionType, fieldName, url}) =>
    isoFetch(url)
        .then(response => {
            if ( !response.ok ) {
                throw new Error( "Ошибка запроса" )
            }
            return response;
        })
        .then(res => res.json())
        .then(data => ({ actionType, fieldName, data}));

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
        modalIsOpen:    false,
        addToWatched:   false,
        // isFetching:     true,
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
        let url = URL_DETAIL + this.props.match.params.id + API_KEY + LANGUAGE;
        let trailerList = URL_DETAIL + this.props.match.params.id + URL_VIDEO + API_KEY + LANGUAGE;
        let castList = URL_DETAIL + this.props.match.params.id + URL_CAST + API_KEY + LANGUAGE;
        let similarFilms = URL_DETAIL + this.props.match.params.id + URL_SIMILAR + API_KEY + LANGUAGE;

        Promise.all([
                   fetchApiData({actionType: 'SET_RECENT_MOVIES', fieldName: 'movieDetail', url: url}),
                   fetchApiData({actionType: 'SET_RECENT_MOVIES_TRAILERS', fieldName: 'recentTrailers', url: trailerList}),
                   fetchApiData({actionType: 'SET_RECENT_MOVIES_CAST', fieldName: 'recentCastList', url: castList}),
                   fetchApiData({actionType: 'SET_RECENT_MOVIES_SIMILAR', fieldName: 'similarMoviesList', url: similarFilms}),
               ])
               .then(results => {
                   results.map(result => ({
                       type: result.actionType,
                       [result.fieldName]: result.data
                   })).forEach(this.props.dispatch);
                   this.setState({
                       isFetching: false,
                   })
               });

    };

    componentWillReceiveProps(nextProps) {

        this.setState({
            movieID: nextProps.match.params.id,
        }, () => {

        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.movieID !== this.state.movieID) {
            let url = URL_DETAIL + this.state.movieID + API_KEY + LANGUAGE;
            let trailerList = URL_DETAIL + this.state.movieID + URL_VIDEO + API_KEY + LANGUAGE;
            let castList = URL_DETAIL + this.state.movieID + URL_CAST + API_KEY + LANGUAGE;
            let similarFilms = URL_DETAIL + this.state.movieID + URL_SIMILAR + API_KEY + LANGUAGE;

            Promise.all([
                       fetchApiData({actionType: 'SET_RECENT_MOVIES', fieldName: 'movieDetail', url: url}),
                       fetchApiData({actionType: 'SET_RECENT_MOVIES_TRAILERS', fieldName: 'recentTrailers', url: trailerList}),
                       fetchApiData({actionType: 'SET_RECENT_MOVIES_CAST', fieldName: 'recentCastList', url: castList}),
                       fetchApiData({actionType: 'SET_RECENT_MOVIES_SIMILAR', fieldName: 'similarMoviesList', url: similarFilms}),
                   ])
                   .then(results => {
                       results.map(result => ({
                           type: result.actionType,
                           [result.fieldName]: result.data
                       })).forEach(this.props.dispatch);
                       this.setState({
                           isFetching: false,
                       })
                   });
        }
    }

    componentWillMount() {
        this.prepareProps( this.state );
    }

    prepareProps = ( props ) => {
        let newState = {
            ...PageMovieInfo.defaultProps,
        };

        let movieID = null;
        if ( this.isExists( props ) ) {
            newState = {
                ...newState,
                ...props,
            };
        }

        if ( this.isExists( this.state.movieID ) ) { movieID = this.state.movieID; }

        movieID = ( movieID !== null ) ? movieID : '';

        this.setState( {
            ...newState,
            movieID: movieID,
        }, () => {

        } );
    };

    isExists = ( value ) => (value !== undefined && value !== null);

    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);

    setToListLate = (e) => {
        let addedMovie = e.currentTarget.dataset.added;
        let copyListLater = [...this.state.listLater];
        // console.log("list later", copyListLater);
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
                    addMovieLater: newListLater,
                })
            })

        } else {
            let movie = {
                movieValue: currentMovie,
                added: true,
            };
            let newList = [...this.state.listLater];
            for( let i = 0; i < newList.length; i++) {
                if( newList[i].movieValue.id ===  this.props.movieDetail.recentMovies.id) {
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
                    addMovieLater: newList,
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
                if( newList[i].movieValue.id ===  this.props.movieDetail.recentMovies.id) {
                    return null;
                } else {
                    newList.push(movie);
                    break;
                }
            }
            this.setState({
                listFavorites: [...newList],
                addToLater: true,
                // isFetching: false,
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
                if( newList[i].movieValue.id ===  this.props.movieDetail.recentMovies.id) {
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
            if( watchLater[i].movieValue.id ===  this.props.movieDetail.recentMovies.id) {
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
            if( copyList[i].movieValue.id ===  this.props.movieDetail.recentMovies.id) {
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
            if( copyList[i].movieValue.id ===  this.props.movieDetail.recentMovies.id) {
                addedMovie = true;
                break;
            } else {

                addedMovie = false;
            }
        }
        return addedMovie;
    };

    openModal = () => {
        this.setState({modalIsOpen: true});
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    render() {
        // let movieDetail = JSON.parse(JSON.stringify(this.props.movieDetail.recentMovies));
        // let movieCast = JSON.parse(JSON.stringify(this.props.movieDetail.recentCastList));
        // let movieTrailer = JSON.parse(JSON.stringify(this.props.movieDetail.recentTrailers));
        const customStyles = {
            content: {
                height: '80%',
                width: '80%',
                padding: 'none',
                margin: 'auto',
                display: 'flex',
                color: '#da2210',
                textAlign: 'center',
                top: '55px',
                backgroundColor: 'rgba(0,0,0, 0.8)',
            },
            overlay: {
                backgroundColor: 'rgba(0,0,0, 0.7)',
            }
        };
        const {movieDetail} = this.props;
        let urlBackground = URL_IMG + BACKDROP_SIZE_ORIGINAL + this.props.movieDetail.recentMovies.backdrop_path;
        let styleSlide = {
            background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.9) 100%)," +  "url(" + urlBackground + ")" + " no-repeat center center fixed",
        };
        console.warn("this.state.isFetching", this.state.isFetching);
        // console.log("movie detail", movieDetail);

        if ( this.state.requestFailed ) return <p>Failed</p>
        if ( this.isExists(this.state.isFetching) !== true ) return <div className = { this.compMainClass + "__loading" }>
            <h3>Loading</h3>
            <div className="slider">
                <div className="line"></div>
                <div className="break dot1"></div>
                <div className="break dot2"></div>
                <div className="break dot3"></div>
            </div>
        </div>
        return (
            <div className = { this.compMainClass + "__wrapper"} style={ styleSlide }>
                <div className = { this.compMainClass + "__container container" }>
                    <div className = { this.compMainClass + "__row"}>
                        <div className = { this.compMainClass + "__left-column"}>
                            <img className = { this.compMainClass + "__left-column_poster"}
                                 src={ URL_IMG + IMG_SIZE_LARGE + this.props.movieDetail.recentMovies.poster_path }
                                 alt=""/>
                        </div>
                        <div className = { this.compMainClass + "__right-column"}>
                            <div className = { this.compMainClass + "__title"}>
                                { this.props.movieDetail.recentMovies.title }
                            </div>
                            <blockquote  className = { this.compMainClass + "__quote"}>
                                { this.props.movieDetail.recentMovies.tagline }
                            </blockquote >
                            <div className = { this.compMainClass + "__inline-block"}>
                                <div className = { this.compMainClass + "__data-release"}>
                                    <div className = { this.compMainClass + "__inline-block_icon"}>
                                        <img src="/images/calendar-flat.png" alt=""/>
                                    </div>
                                    <p className = { this.compMainClass + "__inline-block_text"}>
                                        { (this.props.movieDetail.recentMovies.release_date !== undefined) ? this.props.movieDetail.recentMovies.release_date.substring(0,4) : null }
                                    </p>
                                </div>
                                <div className = { this.compMainClass + "__votes"}>
                                    <div className = { this.compMainClass + "__inline-block_icon"}>
                                        <img src="/images/rating-icon.png" alt=""/>
                                    </div>
                                    <p className = { this.compMainClass + "__inline-block_text"}>
                                        { this.props.movieDetail.recentMovies.vote_average }
                                    </p>
                                </div>
                                <div className = { this.compMainClass + "__votes-count"}>
                                    <div className = { this.compMainClass + "__inline-block_icon"}>
                                        <img src="/images/likes-icon.png" alt=""/>
                                    </div>
                                    <p className = { this.compMainClass + "__inline-block_text"}>
                                        { this.props.movieDetail.recentMovies.vote_count }
                                    </p>
                                </div>
                            </div>
                            <div className = { this.compMainClass + "__block-button"}>
                                <a data-added = { this.checkedMovieInListLater() }
                                   className = { this.compMainClass + "__button" + " " + (this.checkedMovieInListLater() ? "later-active" : "later") }
                                   onClick={ this.setToListLate }><i></i>Хочу посмотреть</a>
                                <a data-added = { this.checkedMovieInListFavorites() }
                                   className = { this.compMainClass + "__button" + " " + (this.checkedMovieInListFavorites() ? "favorites-active" : "favorites")}
                                   onClick={ this.setToListFavorites }><i></i>В избранное</a>
                                <a data-added = { this.checkedMovieInListWatched() }
                                   className = { this.compMainClass + "__button" + " " + (this.checkedMovieInListWatched() ? "watched-active" : "watched")}
                                   onClick={ this.setToListWatched }><i></i>Смотрел</a>
                            </div>
                            <div className = { this.compMainClass + "__description"}>
                                <h4>Про что фильм: </h4>
                                { this.props.movieDetail.recentMovies.overview }
                            </div>
                            <div className = { this.compMainClass + "__block-trailer" }>
                                <a onClick = { this.openModal }
                                        className = { this.compMainClass + "__trailer-button" }>
                                    <i></i>Посмотреть трейлер
                                </a>
                                <Modal
                                    isOpen={this.state.modalIsOpen}
                                    onRequestClose={this.closeModal}
                                    style = { customStyles }
                                    contentLabel="Example Modal">
                                    {
                                        (this.isNotEmpty(this.props.movieDetail.recentTrailers)) ?

                                                <iframe className = { this.compMainClass + "__trailer" }
                                                        width = { '100%' }
                                                        height = { '100%' }
                                                        src={ URL_YOUTUBE + this.props.movieDetail.recentTrailers.slice(0,TRAILER_MAX_NUM)[0].key }
                                                        allowFullScreen/>

                                            : <div className = { this.compMainClass + "__not-found" }>
                                                Извините данный трейлер отсутствует в базе :(
                                            </div>
                                    }
                                </Modal>

                            </div>
                        </div>
                    </div>
                    <div className = { this.compMainClass + "__block-actors" }>
                        <h3>В главных ролях:</h3>
                        <CastList castsValue = { this.props.movieDetail.recentCastList.slice(0, CAST_MAX_NUM) }/>
                    </div>
                    {
                        this.isNotEmpty(this.props.movieDetail.similarMoviesList) ?
                            <div className = { this.compMainClass + "__block-similar" }>
                                <h3>Список похожих фильмов:</h3>
                                <div className = { this.compMainClass + "__similar-films" }>
                                    {
                                        this.props.movieDetail.similarMoviesList.slice(0, 10).map( ( item, index ) => {
                                            return(
                                                <SimilarFilm similarValue = { item } key = { index }/>
                                            )
                                        } )
                                    }
                                </div>
                            </div>
                            : null
                    }


                </div>
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
