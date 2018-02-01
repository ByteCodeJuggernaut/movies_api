import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import { URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, BACKDROP_SIZE_LARGE, API_KEY, URL_DETAIL, BACKDROP_SIZE_ORIGINAL } from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMovieDetail, fetchCastList, fetchTrailerList} from '../../actions/actions';

import './Page_Account.scss';


class PageAccount extends React.PureComponent {

    static propTypes = {

    };

    static  defaultProps = {

    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
        }
    };

    compMainClass = "PageAccount";

    componentDidMount() {

    };

    componentWillReceiveProps(nextProps) {

    }

    isExists = ( value ) => (value !== undefined && value !== null);
    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);

    __renderLisOfMovies = (list) => {
        return (
            list.map( ( film ) => {
                return(
                    <Link to={'/movie/'+ film.movieValue.id} key = { film.movieValue.id } className = { this.compMainClass + "__film" }>
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
                )
            })
        )
    };
    render() {

        console.log("STORE", this.props.accountMovies);
        // if ( this.state.requestFailed ) return <p>Failed</p>
        // if ( !this.state.getMovieID ) return <p>Loading</p>
        return (
            <div className = { this.compMainClass + "__wrapper"}>
                <Grid className = { this.compMainClass + "__container" }>
                    <Row className = { this.compMainClass + "__account "}>
                        <div>
                            Профиль: { this.props.accountDetail.accountName }
                        </div>
                    </Row>
                    <Row className = { this.compMainClass + "__container-watched" }>
                        <h2>Фильмы которые уже посмотрел</h2>
                        {
                            this.__renderLisOfMovies( this.props.accountMovies.watched )
                        }
                    </Row>
                    <Row className = { this.compMainClass + "__container-watchLater" }>
                        <h2>Фильмы которые хочу посмотреть</h2>
                        {
                            this.__renderLisOfMovies( this.props.accountMovies.watchLater )
                        }
                    </Row>
                    <Row className = { this.compMainClass + "__container-watchLater" }>
                        <h2>Избранные фильмы</h2>
                        {
                            this.__renderLisOfMovies( this.props.accountMovies.watchFavorites )
                        }
                    </Row>
                </Grid>
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
