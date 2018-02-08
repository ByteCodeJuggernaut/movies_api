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

import './CastList.scss';
import Cast from '../primitive/Cast';
import { push }                                         from "react-router-redux";


class CastList extends React.PureComponent {
    static propTypes = {
        castsValue:      PropTypes.array,
    };

    static defaultProps = {
        castsValue: []
    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
        }
    };
    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);
    compMainClass = "CastList";

    render() {
            return(
                <div className = { this.compMainClass }>
                    {
                        this.props.castsValue.map( (item, index)  => {
                            return(
                                <Cast castValue = { item } key = { index } />
                            )
                        })
                    }
                </div>
            )
    }
}

export default connect (
    state => ({
        storeApi: state
    }),)
(CastList);

