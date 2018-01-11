import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux'

const defaultStateList = {
    isFetching: false,
    items:[],
    error:{}
};

const moviesApi = combineReducers({
    routing: routerReducer

});

export default moviesApi;