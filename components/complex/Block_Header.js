import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './Block_Header.scss';


class BlockHeader extends React.PureComponent {
    static propTypes = {
        //name: PropTypes.string.isRequired,
        menuList:       PropTypes.array,
    };

    static defaultProps = {
        accountName: "Andrew Lebowskiy",
        accountIconURL: "/images/accounts/default.jpg"

    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
            requestFailed: false,
        }
    };

    componentDidMount() {
        window.addEventListener('scroll', (event) => {
            let scrollY = window.pageYOffset;
            let scrollStart = 60;
            let addedClass;
            if(scrollY >= scrollStart) {
                addedClass = 'sticky';
            } else {
                addedClass = 'unsticky';
        }
        this.setState({
            activeClass: addedClass,
        })
    });
    }

    compMainClass = "BlockHeader";

    testActionClick = () => {
      // console.log("test action click <--");
        this.props.dispatch()
    };

    handleHoverImg = (e) => {
        e.currentTarget.setAttribute('src', '/images/logo-api-white.png');
    };


    handleUnHoverImg = (e) => {
        e.currentTarget.setAttribute('src', '/images/logo-api.png');
    };

    __renderMenuList = () => {
        return(
            this.state.storeApi.menuList.menuList.map( ( elem, index) => {
                return(
                    <li key = { index }
                        onClick={ this.testActionClick }
                        className = { this.compMainClass + "__menu-box_menu-item" }>
                        <a href="">{ elem }</a>
                    </li>
                )
            })
        )
    };

    render() {
        return(
            <Row className = { this.compMainClass + "__container" + " " + this.state.activeClass }>
                <Col className = { this.compMainClass + "__logo-box" }>
                    <a href="#" title="Вернуться на главную">
                        <img src="/images/logo-api.png"
                             alt="Логотип MOVIEFLIX"
                             onMouseOver={ this.handleHoverImg }
                             onMouseOut={ this.handleUnHoverImg }
                             className = { this.compMainClass + "__logo-box_image" }/>
                    </a>
                </Col>
                <Col className = { this.compMainClass + "__menu-box" }>
                    <ul className = { this.compMainClass + "__menu-box_menu" }>
                        { this.__renderMenuList() }
                    </ul>
                </Col>
                <Col className = { this.compMainClass + "__search-box" }>
                    <input type = 'text'
                           className = { this.compMainClass + "__search-box_input" }
                           placeholder = "Поиск по названию..."/>
                </Col>
                <Col className = { this.compMainClass + "__account-box" }>
                    <div className = { this.compMainClass + "__account-box_container" }>
                        <div className = { this.compMainClass + "__account-box_container-title" }>
                            { this.state.accountName }
                        </div>
                        <div className = { this.compMainClass + "__account-box_container-icon" }>
                            <img className = { this.compMainClass + "__account-box_container-icon_image" }
                                 src = { this.state.accountIconURL }
                                 alt = ""/>
                        </div>
                    </div>
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