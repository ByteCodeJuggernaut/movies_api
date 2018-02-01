import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import { URL_LIST, LANGUAGE, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, BACKDROP_SIZE_LARGE, API_KEY, URL_DETAIL, BACKDROP_SIZE_ORIGINAL } from '../../actions/const';
import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';

import { fetchMovieDetail, fetchCastList, fetchTrailerList} from '../../actions/actions';

import './Page_Account.scss';


class PageAccount extends React.PureComponent {

    static propTypes = {

    };

    static  defaultProps = {

    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
        }
    };

    compMainClass = "PageAccount";

    componentDidMount() {

    };

    componentWillReceiveProps(nextProps) {

    }

    isExists = ( value ) => (value !== undefined && value !== null);
    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);

    render() {

        console.log("STORE", this.props.accountMovies);
        // if ( this.state.requestFailed ) return <p>Failed</p>
        // if ( !this.state.getMovieID ) return <p>Loading</p>
        return (
            <div className = { this.compMainClass + "__wrapper"}>
                <Grid className = { this.compMainClass + "__container" }>
                    <Row>
                        Test
                    </Row>

                </Grid>
            </div>
        )
    }

}

export default connect (
    state => ({
        accountMovies: state.myListMovies,
        accountDetail: state.accountDetail,
        // listMovie: state.myListMovies,
    }),
) (PageAccount);
