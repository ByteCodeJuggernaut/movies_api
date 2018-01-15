import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';

import './Page_MovieInfo.scss';


class PageMovieInfo extends React.PureComponent {

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
                    console.log( "data", this.state.getData );
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

    };


    render() {
        console.log("storeApi", this.props.storeApi);
        if ( this.state.requestFailed ) return <p>Failed</p>
        if ( !this.state.getData ) return <p>Loading</p>
        return (
            <div className = { this.compMainClass + "__wrapper"}>

            </div>
        )
    }

}

export default connect (
    state => ({
        storeApi: state
    }),
) (PageMovieInfo);
