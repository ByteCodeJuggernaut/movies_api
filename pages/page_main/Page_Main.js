import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BlockHeader from '../../components/complex/Block_Header';
import BlockHeaderSlide from '../../components/complex/Block_HeaderSlide';

import './Page_Main.scss';


class PageMain extends React.PureComponent {

    static propTypes = {
        //name: PropTypes.string.isRequired,
    };

    constructor( props ) {
        super( props );
        this.state = {
            requestFailed: false,
        }
    };

    compMainClass = "PageMain";

    componentDidMount() {
        let url = URL_LIST + API_KEY + LANGUAGE + SORT_POPULARITY;
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
                    getData: data,
                }, () => {
                    // console.log( "data", this.state.getData );
                    this.props.dispatch({
                        type: "SET_POPULAR_MOVIE_LIST",
                        dataMovies: this.state.getData.results,
                    })
                } );
            }, () => {
                this.setState( {
                    requestFailed: true,
                } )
            } )
    };

    isExists = ( value ) => (value !== undefined && value !== null);

    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);

    __renderListFilms = () => {
        let listFilms = [ ...this.props.storeApi.movieList.popularFilmsList ];
        // console.log("list films", listFilms);
        if ( this.isNotEmpty( listFilms ) ) {
            let renderFilm = listFilms.map( ( film ) => {
                return (
                    <Col xs={12} sm={2} md={3} lg={3}
                         key={ film.id }>
                        <Link to={'/movie/'+ film.id} >
                            <div className = { this.compMainClass + "__element"}
                                 style = {{ backgroundImage: 'url(' +  URL_IMG + IMG_SIZE_LARGE + film.poster_path  + ')' }}>
                                <div className = { this.compMainClass + "__overlay" }>
                                    <div className = { this.compMainClass + "__overlay_title" }>
                                        { film.title }
                                    </div>
                                    <div className = { this.compMainClass + "__overlay_rating" }>
                                        { film.vote_average }
                                    </div>
                                    <div className = { this.compMainClass + "__overlay_plot" }>
                                        {
                                            (film.overview.length > 100) ?  film.overview.substring(0, 100) + "..." : film.overview
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </Col>
                )
            } );
            return renderFilm;
        }
    };


    render() {
        console.log("storeApi", this.props);
        if ( this.state.requestFailed ) return <p>Failed</p>
        if ( !this.state.getData ) return <p>Loading</p>
        return (
            <div className = { this.compMainClass + "__wrapper"}>
                <BlockHeaderSlide/>
                <Grid className = { this.compMainClass + "__container"}>
                    <Row>

                    </Row>
                    <Row>
                        { this.__renderListFilms() }
                    </Row>
                </Grid >
            </div>
        )
    }

}

export default connect (
    state => ({
        storeApi: state
    }),
) (PageMain);
