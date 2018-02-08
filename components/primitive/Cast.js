import React from 'react';
import PropTypes from 'prop-types';
// import logo from '../../images/logo_square.svg'
import {
    URL_LIST, URL_SEARCH, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XSMALL, IMG_SIZE_SMALL,
    IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT,
    BACKDROP_SIZE_ORIGINAL
} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect }                                      from 'react-redux';
import { NavLink }                                      from 'react-router-dom';
import { Link }                                         from 'react-router-dom';
import {popupEvents,EVENT_CLOSE_POPUPS}                 from '../../broadcast';

import './Cast.scss';
import { push }                                         from "react-router-redux";


class Cast extends React.PureComponent {
    static propTypes = {
        castValue:      PropTypes.object,
    };

    static defaultProps = {
        castValue: {
            profile_path: '',
            character: '',
            name: '',
        }
    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
        }
    };

    compMainClass = "Cast";

    render() {

        return(
            <div className = { this.compMainClass }>
                <img src={ URL_IMG + IMG_SIZE_MEDIUM + this.state.castValue.profile_path } alt="" className = { this.compMainClass + "__poster"}/>
                <div className = { this.compMainClass + "__actor"}>
                    <p>
                        { this.state.castValue.name }
                    </p>
                </div>
            </div>
        )
    }
}

export default connect (
    state => ({
        storeApi: state
    }),)
(Cast);

