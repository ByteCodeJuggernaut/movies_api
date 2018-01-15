import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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

    compMainClass = "BlockHeaderSlide";


    render() {
        return(
            <Row className = { this.compMainClass + "__container"}>
                <div className = {  this.compMainClass + "__title"} >

                </div>
                <div className = {  this.compMainClass + "__rating"}>

                </div>
                <div className = {  this.compMainClass + "__description"}>

                </div>

            </Row>
        )
    }
}

export default connect (
    state => ({
        storeApi: state
    }),)
(BlockHeaderSlide);