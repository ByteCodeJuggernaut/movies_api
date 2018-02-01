import React, { Component } from 'react';
import BlockHeader from './components/complex/Block_Header';
import './App.scss';

export default class App extends Component {
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}