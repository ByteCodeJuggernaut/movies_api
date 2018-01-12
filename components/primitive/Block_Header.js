import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';

import './Block_Header.scss';


class BlockHeader extends React.PureComponent {
    static propTypes = {
        //name: PropTypes.string.isRequired,
        menuList:       PropTypes.array,
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

    compMainClass = "BlockHeader";

    testActionClick = () => {
      // console.log("test action click <--");
        this.props.dispatch()
    };

    __renderMenuList = () => {
        return(
            this.state.menuList.map( ( elem, index) => {
                return(
                    <li key = { index } onClick={ this.testActionClick }>
                        <a href="">{ elem }</a>
                    </li>
                )
            })
        )
    };

    render() {
        // console.log("menuList", this.state.menuList);
        return(
            <Row className = { this.compMainClass + "__container"}>
                <Col>
                    LOGO
                </Col>
                <Col>
                    <ul>
                        { this.__renderMenuList() }
                    </ul>
                </Col>
            </Row>
            )
    }
}

export default connect (
    state => ({
        storeApi: state
    }),)
    (BlockHeader);