import React                                            from 'react';
import ReactDOM                                         from 'react-dom';
import { Provider }                                     from 'react-redux';
import { createStore, applyMiddleware }                 from 'redux';
// import { Router, Route, hasHistory , IndexRoute }    from 'react-router';
import { BrowserRouter as Router, Route }               from 'react-router-dom';
import { CSSTransitionGroup }                           from 'react-transition-group'
import { syncHistoryWithStore, routerMiddleware }       from 'react-router-redux';
import { composeWithDevTools }                          from 'redux-devtools-extension';
import thunk                                            from 'redux-thunk';

import movieApp                                         from './reducers';
import App                                              from './App';

import PageMain                                         from './pages/page_main/Page_Main';
import PageAccount                                      from './pages/page_account/Page_Account';
import PageMovieInfo                                    from './pages/page_movie_info/Page_MovieInfo';
import BlockHeader                                      from './components/complex/Block_Header';

// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {
require('./App.scss');


const store = createStore( movieApp, composeWithDevTools(applyMiddleware(thunk)));



ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <BlockHeader/>

                    <Route exact path="/" component = { PageMain }/>
                    <Route path="/mylist" component = { PageAccount }/>
                    <Route path="/movie/:id" component = { PageMovieInfo }/>

            </div>
        </Router>
    </Provider>
    , document.getElementById('container') );
