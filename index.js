import React                                            from 'react';
import ReactDOM                                         from 'react-dom';
import { Provider }                                     from 'react-redux';
import { createStore, applyMiddleware }                                  from 'redux';
// import { Router, Route, hasHistory , IndexRoute }   from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
// import { syncHistoryWithStore, routerMiddleware }       from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk                                  from 'redux-thunk';

import movieApp                                         from './reducers';
import App                                              from './App';

import PageMain                                         from './pages/page_main/Page_Main';
import PageMovieInfo                                    from './pages/page_movie_info/Page_MovieInfo';
import BlockHeader                                      from './components/complex/Block_Header';

// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {
// require('./App.scss');

// const routeMiddleware = routerMiddleware(hashHistory);
const store = createStore( movieApp, composeWithDevTools(applyMiddleware(thunk)));
// const history = syncHistoryWithStore(hashHistory,store);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <BlockHeader/>
                <Route exact path="/" component = { PageMain }/>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('container') );