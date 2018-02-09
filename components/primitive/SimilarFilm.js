import React from 'react';
import PropTypes from 'prop-types';
// import logo from '../../images/logo_square.svg'
import {
    URL_LIST, URL_SEARCH, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XSMALL, IMG_SIZE_SMALL,
    IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT,
    BACKDROP_SIZE_ORIGINAL
} from '../../actions/const';
import { connect }                                      from 'react-redux';
import { NavLink }                                      from 'react-router-dom';
import { Link }                                         from 'react-router-dom';
import {popupEvents,EVENT_CLOSE_POPUPS}                 from '../../broadcast';

import './SimilarFilm.scss';
import { push }                                         from "react-router-redux";


class SimilarFilm extends React.PureComponent {
    static propTypes = {
        similarValue:      PropTypes.object,
    };

    static defaultProps = {
        similarValue: {

        }
    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
        }
    };

    compMainClass = "SimilarFilm";

    render() {
        return(
            <Link to={ '/movie/'+ this.state.similarValue.id } className = { this.compMainClass }>
                <img src={ URL_IMG + IMG_SIZE_MEDIUM + this.state.similarValue.poster_path }
                     alt=""
                     className = { this.compMainClass + "__poster"}/>
                <div className = { this.compMainClass + "__title"}>
                    <p>
                        { this.state.similarValue.title }
                    </p>
                </div>
                <div className = { this.compMainClass + "__year"}>
                    <p>
                        { this.state.similarValue.release_date.substring(0,4) }
                    </p>
                </div>
                <div className = { this.compMainClass + "__country"}>
                    <p>
                        { this.state.similarValue.vote_average }
                    </p>
                </div>
            </Link>
        )
    }
}

export default connect (
    state => ({
        storeApi: state
    }),)
(SimilarFilm);

