import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import {URL_LIST, URL_LIST_TOP_RATED, URL_LIST_UPCOMING, URL_POPULAR, SORT_VOTE, LANGUAGE, REGION, SORT_POPULARITY, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, API_KEY, API_KEY_ALT} from '../../actions/const';
// import { Row, Col, Grid , getRowProps, getColumnProps } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { getMovies } from '../../actions/actions';


const fetchApiData = ({actionType, fieldName, url}) =>
    isoFetch(url)
        .then(response => {
            if ( !response.ok ) {
                throw new Error( "Ошибка запроса" )
            }
            return response;
        })
        .then(res => res.json())
        .then(data => ({ actionType, fieldName, data}));


let g_settings = {
    dots: false,
    arrows: true,
    draggable: true,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 2,
    vertical: false,
    verticalSwiping: false,
    adaptiveHeight: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 3 }
        },
        {
            breakpoint: 824,
            settings: { slidesToShow: 2, arrows: false, dots: true, autoplay: true, vertical: true,
                verticalSwiping: true, slidesToScroll: 1, }
        },
        {
            breakpoint: 1378,
            settings: { slidesToShow: 5 }
        },

    ]
};
import BlockHeader from '../../components/complex/Block_Header';
import BlockHeaderSlide from '../../components/complex/Block_HeaderSlide';

import './Page_Main.scss';

class FilmsRenderer extends React.PureComponent {
    constructor(props) {
        super( props );
    }
    compMainClass = "PageMain";
    render() {
        // console.warn('rendering slider!!', this.props.filmList);
        let filterList = this.props.filmList.filter((item) => {
            if(item.poster_path !== null && item.poster_path !== undefined) {
                return item;
            }
        });
        return(
            <Slider {...g_settings} className = { this.compMainClass + "__slider_1" } key = { "dsfdsfd" } >
                {filterList.map( ( film ) => {
                    return (

                        <Link key={ film.id } to={'/movie/'+ film.id} className = { this.compMainClass + "__element-link" }>
                            <div className = { this.compMainClass + "__element"}
                                 style = {{ backgroundImage: 'url(' +  URL_IMG + IMG_SIZE_LARGE + film.poster_path  + ')' }}>
                                <div className = { this.compMainClass + "__overlay" }>
                                    <div className = { this.compMainClass + "__overlay_title" }>
                                        { film.title }
                                    </div>
                                    <div className = { this.compMainClass + "__overlay_rating" }>
                                            <span>
                                                { film.vote_average }
                                            </span> Рейтинг
                                    </div>
                                    <div className = { this.compMainClass + "__overlay_plot" }>
                                        {
                                            (film.overview.length > 150) ?  film.overview.substring(0, 150) + "..." : film.overview
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>

                    )
                } )}
            </Slider>
        )
    }
}

class PageMain extends React.Component {

    static propTypes = {
        popularFilmsList: PropTypes.arrayOf(PropTypes.object).isRequired,
        upcomingFilmList: PropTypes.arrayOf(PropTypes.object).isRequired,
        topRatedFilmList: PropTypes.arrayOf(PropTypes.object).isRequired
        //name: PropTypes.string.isRequired,
    };
    static defaultProps = {
        // getPopular: [],
        // getUpcoming: [],
        // getRating: [],
    };

    constructor( props ) {
        super( props );
        this.state = {
            //...props,
            requestFailed: false
        }
    };

    compMainClass = "PageMain";

    componentDidMount() {
        console.warn('componentDidMount');

        // this.props.getMovies();

        // this.props.dispatch(getMovies());

        let urlPopular = URL_POPULAR + API_KEY + LANGUAGE + REGION;
        let urlUpcoming = URL_LIST_UPCOMING + API_KEY + LANGUAGE + REGION;
        let urlTopRated = URL_LIST_TOP_RATED + API_KEY + LANGUAGE + REGION;

        Promise.all([
            fetchApiData({actionType: 'SET_POPULAR_MOVIE_LIST', fieldName: 'dataMoviesPopular', url: urlPopular}),
            fetchApiData({actionType: 'SET_UPCOMING_MOVIE_LIST', fieldName: 'dataMoviesUpcoming', url: urlUpcoming}),
            fetchApiData({actionType: 'SET_TOP_RATING_MOVIE_LIST', fieldName: 'dataMoviesTop', url: urlTopRated})
        ])
           .then(results => {
               console.warn('results received:', results);
               results.map(result => ({
                    type: result.actionType,
                    [result.fieldName]: result.data.results
                })).forEach(this.props.dispatch);
            });
    };

    componentWillMount() {
        this.prepareProps( this.state );
    }
    componentWillReceiveProps( newProps ) {
        this.prepareProps( newProps );
    }

    prepareProps = ( props ) => {
        let newState = {
            ...PageMain.defaultProps,
        };

        let value = null;
        if ( this.isExists( props ) ) {
            newState = {
                ...newState,
                ...props,
            };
        }

        if ( this.isExists( this.state.value ) ) { value = this.state.value; }

        value = ( value !== null ) ? value : '';

        this.setState( {
            ...newState,
            value: value,
        }, () => {
            // console.log( '%c%s', 'color: green', 'SubmiteBlock: prepareProps: state: ',
            // this.state );
        } );
    };


    isExists = ( value ) => (value !== undefined && value !== null);

    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);


    render() {
        // console.log("movieList", this.props.storeApi.movieList);
        if ( this.state.requestFailed ) return <p>Failed</p>
        // if ( !this.state.getPopular &&  !this.state.getRating && !this.state.getUpcoming) return <p>Loading</p>
        return (
            <div className = { this.compMainClass + "__wrapper"}>
                <BlockHeaderSlide/>
                <div className = { this.compMainClass + "__container"}>
                    <div className = { this.compMainClass + "__block-popular-films" }>
                        <h2 className = { this.compMainClass + "__block-title" }>
                            Популярные фильмы сегодня
                        </h2>
                        <FilmsRenderer filmList={this.props.popularFilmsList}/>
                    </div>
                    <div className = { this.compMainClass + "__block-coming-films" }>
                        <h2 className = { this.compMainClass + "__block-title" }>
                            Скоро выходит в кинотеатрах
                        </h2>
                        <FilmsRenderer filmList={this.props.upcomingFilmList}/>
                    </div>
                    <div className = { this.compMainClass + "__block-rating-films" }>
                        <h2 className = { this.compMainClass + "__block-title" }>
                            Рейтинг лучших фильмов
                        </h2>
                        <FilmsRenderer filmList={this.props.topRatedFilmList}/>
                    </div>
                </div >
            </div>
        )
    }

}

export default connect (
    state => ({
        popularFilmsList: state.movieList.popularFilmsList,
        upcomingFilmList: state.movieList.upcomingFilmList,
        topRatedFilmList: state.movieList.topRatedFilmList
    }),
) (PageMain);
