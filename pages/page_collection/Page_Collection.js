import React from 'react';
import PropTypes from 'prop-types';
import { default as isoFetch } from 'isomorphic-fetch';
import { URL_LIST, LANGUAGE, URL_COLLECTION, URL_IMG, IMG_SIZE_LARGE, IMG_SIZE_XLARGE, IMG_SIZE_MEDIUM, BACKDROP_SIZE_MEDIUM, BACKDROP_SIZE_LARGE, API_KEY, URL_DETAIL, BACKDROP_SIZE_ORIGINAL, URL_CAST, URL_VIDEO, CAST_MAX_NUM, URL_YOUTUBE, TRAILER_MAX_NUM } from '../../actions/const';
import { Link }                                         from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchMovieDetail, fetchCastList, fetchTrailerList} from '../../actions/actions';

import './Page_Collection.scss';


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

class PageCollection extends React.PureComponent {

    static propTypes = {
        addToLater:             PropTypes.bool,
    };

    static  defaultProps = {

    };

    constructor( props ) {
        super( props );
        this.state = {
            ...props,
            requestFailed: false,
            collectionID: this.props.collections.collections[Math.floor(Math.random()*this.props.collections.collections.length)]
        }
    };

    compMainClass = "PageCollection";

    componentDidMount() {
        let url = URL_COLLECTION + this.state.collectionID  + API_KEY + LANGUAGE;

        Promise.all([
                   fetchApiData({actionType: 'SET_COLLECTION_MOVIES', fieldName: 'collections', url: url}),
               ])
               .then(results => {
                   results.map(result => ({
                       type: result.actionType,
                       [result.fieldName]: result.data
                   })).forEach(this.props.dispatch);
                   this.setState({
                       isFetching: false,
                   })
               });

    };

    componentWillReceiveProps(nextProps) {

        this.setState({
            movieID: nextProps.match.params.id,
        }, () => {

        });

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillMount() {
        this.prepareProps( this.state );
    }

    prepareProps = ( props ) => {
        let newState = {
            ...PageCollection.defaultProps,
        };

        let movieID = null;
        if ( this.isExists( props ) ) {
            newState = {
                ...newState,
                ...props,

            };
        }

        if ( this.isExists( this.state.movieID ) ) { movieID = this.state.movieID; }

        movieID = ( movieID !== null ) ? movieID : '';

        this.setState( {
            ...newState,
            movieID: movieID,
        }, () => {

        } );
    };

    isExists = ( value ) => (value !== undefined && value !== null);

    isNotEmpty = ( value ) => (value !== null && value !== undefined && value.length > 0);

    __renderCollectionList = () => {

        return (
            this.props.collections.selectedCollection.parts.map((film,index) => {
                let urlBackground = URL_IMG + BACKDROP_SIZE_ORIGINAL + film.backdrop_path;
                let styleSlide = {
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.7)" +
                    " 100%)," +  "url(" + urlBackground + ")" + " no-repeat center center fixed",
                };
                return (
                    <div className = { this.compMainClass + "__film" }
                         key={ index }
                         style = { styleSlide }>
                        <div className = { this.compMainClass + "__poster" }>
                            <img src={ URL_IMG + IMG_SIZE_LARGE + film.poster_path  } alt="" className = { this.compMainClass + "__image" }/>
                        </div>
                        <div className = { this.compMainClass + "__info" }>
                            <Link to={ '/movie/'+ film.id } className = { this.compMainClass + "__info-title" }>
                                {
                                    film.title
                                }
                            </Link>
                            <div className = { this.compMainClass + "__info-rating" }>
                                Рейтинг: { film.vote_average }
                            </div>
                            <div className = { this.compMainClass + "__info-data" }>
                                Год выхода: { film.release_date.substring(0,4) }
                            </div>
                            <h3>Описание: </h3>
                            <p className = { this.compMainClass + "__info-overview" }>
                                { film.overview }
                            </p>
                        </div>
                    </div>
                )
            })
        )
    };
    render() {
        let urlBackground = URL_IMG + BACKDROP_SIZE_ORIGINAL + this.props.collections.selectedCollection.backdrop_path;
        let styleSlide = {
            background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.9) 100%)," +  "url(" + urlBackground + ")" + " no-repeat center center fixed",
        };
        console.log("props collection", this.props.collections.collections[Math.floor(Math.random()*this.props.collections.collections.length)]);
        if ( this.state.requestFailed ) return <p>Failed</p>
        if ( this.isExists(this.state.isFetching) !== true ) return <div className = { this.compMainClass + "__loading" }>
            <h3>Loading</h3>
            <div className="slider">
                <div className="line"></div>
                <div className="break dot1"></div>
                <div className="break dot2"></div>
                <div className="break dot3"></div>
            </div>
        </div>
        return (
            <div className = { this.compMainClass + "__wrapper"} style = { styleSlide }>
                <div className = { this.compMainClass + "__header" } >
                    <h2>
                        { this.props.collections.selectedCollection.name }
                    </h2>
                    <p>
                        { this.props.collections.selectedCollection.overview }
                    </p>
                </div>
                <div className = { this.compMainClass + "__collection" }>
                    { this.__renderCollectionList() }
                </div>

            </div>
        )
    }

}

export default connect (
    state => ({
        collections: state.moviesCollection,
    }),
) (PageCollection);


// adult
//     :
//     false
// backdrop_path
//     :
//     "/sFthBeT0Y3WVfg6b3MkcJs9qfzq.jpg"
// genre_ids
//     :
//     (2) [12, 878]
// id
//     :
//     262504
// original_language
//     :
//     "en"
// original_title
//     :
//     "Allegiant"
// overview
//     :
//     "Трис и Тобиас вместе с компанией друзей выбираются за пределы родного дома. Они хотят узнать правду и обрести свободу. Но попадают прямиком в Бюро Генетической Защиты. Оказывается, в прошлом разгорелась генетическая война за чистоту. В результате мир поделили на «генетически чистых» и «генетически поврежденных» особей. А ученые превратились в одержимых чудовищ и принялись экспериментировать: создавать искусственные поселения и внедрять в них своих агентов. Главная цель подопытных — служить расходным материалом и давать «генетически чистое» потомство. Трис возмущена до глубины души, Тобиас мечется в поисках самого себя и вляпывается в очередную переделку. А ученые из Бюро опять недовольны. Они намерены устроить «перезагрузку», то есть стереть память всех жителей города. Трис решает предотвратить катастрофу."
// popularity
//     :
//     17.712224
// poster_path
//     :
//     "/tlMoUmXIGI2lQPCkFgoYHHgrVgH.jpg"
// release_date
//     :
//     "2016-03-09"
// title
//     :
//     "Дивергент, глава 3: За стеной"
// video
//     :
//     false
// vote_average
//     :
//     5.9
// vote_count
//     :
//     2429