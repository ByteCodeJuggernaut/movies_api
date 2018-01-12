import React            from 'react';
import ReactDOM         from 'react-dom';
import { Provider }     from 'react-redux';
import { createStore }  from 'redux';

import movieApp from './reducers';

import MovieAPI from './components/MovieAPI';

// если необходимо, вид сборки можно проверить в коде:
// if (process.env.NODE_ENV === 'production') {
// if (process.env.NODE_ENV !== 'production') {
require('./App.scss');

const store = createStore(movieApp);

ReactDOM.render(
    <Provider store = { store }>
        <MovieAPI />
    </Provider>
, document.getElementById('container') );
