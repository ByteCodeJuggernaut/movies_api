import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, REGION, ADULTS, URL_NOW_PLAYING, DATA_RELEASE_START, DATA_RELEASE_END, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, BACKDROP_SIZE_LARGE, BACKDROP_SIZE_ORIGINAL, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
// import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import './Element_HeaderSlide.scss';

const compMainClass = "ElementHeaderSlide";

let g_settings = {
    dots: false,
    fade: true,
    autoplay: true,
    centerPadding: '0px',
    arrows: false,
    draggable: true,
    infinite: true,
    centerMode: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    pauseOnHover: true,
    swipe: true,
};

class ElementHeaderSlide extends React.PureComponent {
    static propTypes = {
    };

    static defaultProps = {

    };

    constructor( props ) {
        super( props );
        this.state = {
            requestFailed: false,
        }
    };

    componentDidMount() {

    };

    __renderSlide = (array) => {
        let elem = {...array[0]};
        let filterFilmsList = array.filter(film => {
            if( film.poster_path !== null &&  film.poster_path !== undefined ) {
                if( film.popularity !== null && film.popularity !== undefined ) {
                    if( film.overview !== null && film.overview !== undefined ) {
                        if( film.backdrop_path !== null && film.backdrop_path !== undefined ) {
                            return film
                        }

                    }
                }
            }
        });
        let urlBackground = URL_IMG + BACKDROP_SIZE_ORIGINAL + elem.backdrop_path;
        let styleSlide = {
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.4) 100%)," +  "url(" + urlBackground + ")" + " no-repeat center center fixed",
        };
        // console.log('elem.overview.length', elem.overview);
        return(
            filterFilmsList.map(( film ) => {
                return(
                    <div className = { compMainClass + "__slide" }
                         key = { film.id }
                         style={{  background: "linear-gradient(to bottom, rgba(0,0,0,0.7)" +
                             " 0%,rgba(0,0,0,0.4) 100%)," +  "url(" + URL_IMG + BACKDROP_SIZE_ORIGINAL + film.backdrop_path + ")" + " no-repeat center center" }} >
                        <div className = { compMainClass + "__left-side" }>

                            <div className = { compMainClass + "__title" }>
                                { film.title }
                            </div>
                            <div className = { compMainClass + "__popularity" }>
                                Рейтинг:
                                <span>
                                    { film.vote_average }
                                </span>
                            </div>
                            <div className = { compMainClass + "__data-release" }>
                                Дата выхода:
                                <span>
                                    { film.release_date  }
                                </span>
                            </div>
                            <div className = { compMainClass + "__description" }>
                                {  (film.overview.length > 400) ?  film.overview.substring(0, 400) + "..." : film.overview }
                            </div>
                            <div className = { compMainClass + "__link-to-movie" }>
                                <Link to={'/movie/'+ film.id}>
                                    <button className = { compMainClass + "__link-to-movie_button" }>
                                        Подробнее
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className = { compMainClass + "__right-side" }>
                            <div className = { compMainClass + "__poster" }>
                                <img className = { compMainClass + "__poster-image" }
                                     src={ URL_IMG + IMG_SIZE_LARGE + film.poster_path } alt=""/>
                            </div>
                        </div>
                    </div>
                )
            })

        )


    };

    render() {
        return(
                <div className={ compMainClass + "__slider" }>
                    <div className = { compMainClass + "__head-title" }>
                        Сегодня в кинотеатрах
                    </div>
                    <Slider { ...g_settings }>
                        { this.__renderSlide(this.props.primaryMovieList.dataPrimary) }
                    </Slider>
                </div>
        )
    }
}

export default connect (
    state => ({
        primaryMovieList: state.primaryMovieList,
    }),)
(ElementHeaderSlide);