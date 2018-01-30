import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, REGION, ADULTS, URL_NOW_PLAYING, DATA_RELEASE_START, DATA_RELEASE_END, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, BACKDROP_SIZE_LARGE, BACKDROP_SIZE_ORIGINAL, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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

    __renderSlide = (array) => {
        let elem = {...array[0]};
        let urlBackground = URL_IMG + BACKDROP_SIZE_ORIGINAL + elem.backdrop_path;
        let styleSlide = {
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.4) 100%)," +  "url(" + urlBackground + ")" + " no-repeat center center fixed",
        };
        // console.log('elem.overview.length', elem.overview);
        return(
            <div className = { this.compMainClass + "__slide" } style={ styleSlide } >
                <div className = { this.compMainClass + "__left-side" }>
                    <div className = { this.compMainClass + "__head-title" }>
                        Сегодня в кинотеатрах
                    </div>
                    <div className = { this.compMainClass + "__title" }>
                        { elem.title }
                    </div>
                    <div className = { this.compMainClass + "__popularity" }>
                       Популярность:
                        <span>
                            { Number(elem.popularity).toFixed(2) }
                        </span>

                    </div>
                    <div className = { this.compMainClass + "__data-release" }>
                        Дата выхода:
                        <span>
                            { elem.release_date  }
                        </span>
                    </div>
                    <div className = { this.compMainClass + "__description" }>
                        {  elem.overview }
                    </div>
                </div>
                <div className = { this.compMainClass + "__right-side" }>
                    <div className = { this.compMainClass + "__poster" }>
                        <img className = { this.compMainClass + "__poster-image" }
                             src={ URL_IMG + IMG_SIZE_LARGE + elem.poster_path } alt=""/>
                    </div>
                </div>
            </div>
        )

        // return(
        //     elem.map( (item, index) =>  {
        //         return(
        //             <div key={ index }>
        //                 <Col lg={8}>
        //                     <div>
        //                         { item.title }
        //                     </div>
        //                     <div>
        //                         { item.popularity }
        //
        //                     </div>
        //                     <div>
        //                         { item.release_date }
        //                     </div>
        //                     <div>
        //                         { item.overview }
        //                     </div>
        //                 </Col>
        //                 <Col lg={4}>
        //                     <div>
        //                         <img src={ URL_IMG + IMG_SIZE_LARGE + item.poster_path } alt=""/>
        //                     </div>
        //                 </Col>
        //             </div>
        //         )
        //     } )
        // )

    };

    render() {
        let primaryMovieList = [...this.props.primaryMovieList.dataPrimary];
        // console.log("primary movie list: ", primaryMovieList);

        // console.log("statePrimaryMovieList",statePrimaryMovieList);
        return(
            <div className = { this.compMainClass + "__container"} >
                {/*<div className={ this.compMainClass + "__slider" }>*/}
                    {/*{ this.__renderSlide(primaryMovieList) }*/}
                {/*</div>*/}
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