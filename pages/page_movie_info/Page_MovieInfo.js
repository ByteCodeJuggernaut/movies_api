import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, URL_DETAIL} from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';

import './Page_MovieInfo.scss';


class PageMovieInfo extends React.PureComponent {

    static propTypes = {
        //name: PropTypes.string.isRequired,
    };

    constructor( props ) {
        super( props );
        this.state = {
            movieID: this.props.match.params.id,
            requestFailed: false,
        }
    };

    compMainClass = "PageMain";

    componentDidMount() {
        let url = URL_DETAIL + this.state.movieID + API_KEY + LANGUAGE;
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
                    getMovieID: data,
                }, () => {
                    console.log( "getMovieID", this.state.getMovieID );
                    this.props.dispatch({
                        type: "SET_RECENT_MOVIES",
                        movieDetail: this.state.getMovieID,
                    })
                } );
            }, () => {
                this.setState( {
                    requestFailed: true,
                } )
            } )
    };

    isExists = ( value ) => (value !== undefined && value !== null);

    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);

    render() {
        console.log("CHECKED PROPS --->",this.props.movieDetail.recentMovies );
        if ( this.state.requestFailed ) return <p>Failed</p>
        if ( !this.state.getMovieID ) return <p>Loading</p>
        return (
            <div className = { this.compMainClass + "__wrapper"}>
                <Grid>
                    <Row>
                        <div>
                            <img src={ URL_IMG + IMG_SIZE_LARGE + this.props.getMovieID.poster_path } alt=""/>
                        </div>
                        <div>
                            <div>
                                { this.props.getMovieID.title }
                            </div>
                            <div>
                                { this.props.getMovieID.tagline }
                            </div>
                            <div>
                                { this.props.getMovieID.release_date }
                            </div>
                            <div>
                                { this.props.getMovieID.vote_average }
                            </div>
                            <div>
                                { this.props.getMovieID.vote_count }
                            </div>
                            <div>
                                { this.props.getMovieID.overview }
                            </div>
                        </div>
                    </Row>
                    <div>
                        Actors
                    </div>
                </Grid>
            </div>
        )
    }

}

export default connect (
    state => ({
        movieDetail: state.recentMoviesList

    }),
) (PageMovieInfo);
