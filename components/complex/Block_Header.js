import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch }                         from 'isomorphic-fetch';
import Autosuggest                                      from 'react-autosuggest';
// import logo from '../../images/logo_square.svg'
import {URL_LIST, URL_SEARCH, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XSMALL, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect }                                      from 'react-redux';
import { NavLink }                                      from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Block_Header.scss';
import { push } from "react-router-redux";


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
            value: '',
            suggestions:[],
            requestFailed: false,
        }
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    handleKeyDown = (event) => {
        if(event.key == 'Enter') {
            return this.handleSubmit(this.state.value);
        }
    }

    handleSubmit = (searchText) => {
        this.props.dispatch(push('/search/'+ searchText));
        this.setState({ value: ''});
    }


    getSuggestionValue = (suggestion) => {
        return suggestion.title;
    };

    onSuggestionsFetchRequested = ({ value }) => {
        const trimmedValue = value.trim();

        if (trimmedValue.length > 0) {
            let url = URL_SEARCH + API_KEY + LANGUAGE + "query=" + trimmedValue ;
            fetch(url)
                .then(response => response.json())
                .then(json => json.results)
                .then(data => {
                    const results = data.map(movie => {
                        let temp = {};
                        temp.id = movie.id;
                        temp.title = movie.title;
                        temp.img = movie.poster_path;
                        temp.year = (movie.release_date == "") ? "0000" : movie.release_date.substring(0,4);
                        return temp
                    });
                    this.setState({
                        suggestions: results
                    });
                }).catch(error => console.log('Exception to get Suggestions'))
        }
        else {
            this.setState({
                suggestions: []
            })
        }
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    renderSuggestion = (suggestion) => {
        return (
            <Link to={'/movie/'+ suggestion.id} >
                <img className="searchResult-image" src= {suggestion.img == null ? "#" : URL_IMG+IMG_SIZE_XSMALL+suggestion.img } />
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {suggestion.title}
                    </div>
                    {suggestion.year}
                </div>
            </Link>
        );
    };

    onSuggestionSelected = (event, { suggestion, method }) => {
        if (method === 'enter')
            event.preventDefault();
        this.props.dispatch(push('/movie/'+ suggestion.id));
        this.setState({ value: ''});
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
                            <NavLink to={ elem.linkTo }
                                     exact
                                     activeStyle={{
                                         fontWeight: 'bold',
                                         background: '#e50914'
                                     }}>
                               { elem.title }
                            </NavLink>
                        </li>

                )
            })
        )
    };

    render() {

        const {value, suggestions} = this.state;
        const inputProps = {
            value,
            onChange: this.onChange,
            onKeyPress: this.handleKeyDown,
            type: 'search',
            placeholder: 'Search Movie Title...'
        };
        return(
            <div>
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
                <div className = { this.compMainClass + "__search-box" }>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps} />
                </div>
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

        </div>
            )
    }
}

export default connect (
    state => ({
        storeApi: state
    }),)
    (BlockHeader);


{/*<input type = 'text'*/}
       {/*className = { this.compMainClass + "__search-box_input" }*/}
       {/*placeholder = "Поиск по названию..."/>*/}