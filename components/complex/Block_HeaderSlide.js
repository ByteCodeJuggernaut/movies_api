import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, REGION, ADULTS, URL_NOW_PLAYING, DATA_RELEASE_START, DATA_RELEASE_END, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, BACKDROP_SIZE_LARGE, BACKDROP_SIZE_ORIGINAL, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
// import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ElementHeaderSlide from './Element_HeaderSlide';

import './Block_HeaderSlide.scss';


class BlockHeaderSlide extends React.PureComponent {
    static propTypes = {
    };

    static defaultProps = {

    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
            requestFailed: false,
        }
    };

    componentDidMount() {
        let dataToday = new Date();
        let url = URL_NOW_PLAYING + API_KEY + LANGUAGE + REGION;
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
                    getPrimaryFilms: data.results,
                }, () => {
                    // console.log( "MOVIE_TODAY_LIST: ", this.state.getData.results );
                    this.props.dispatch({
                        type: "SET_MOVIE_TODAY_LIST",
                        dataPrimary: this.state.getPrimaryFilms,
                    })
                } );
            }, () => {
                this.setState( {
                    requestFailed: true,
                } )
            } )
    };

    compMainClass = "BlockHeaderSlide";


    render() {
        let primaryMovieList = [...this.props.primaryMovieList.dataPrimary];

        return(
            <div className = { this.compMainClass + "__container"} >
                <ElementHeaderSlide/>
            </div>
        )
    }
}

export default connect (
    state => ({
        primaryMovieList: state.primaryMovieList,
    }),)
(BlockHeaderSlide);