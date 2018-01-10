import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import './TestComponent.css';

const urlTMDBmovie = 'https://api.themoviedb.org/3/movie/76341?api_key=65bb0de10429ea02eeee57ec78b575a3&language=ru';

class TestComponent extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  constructor(props) {
      super(props);
      this.state = {
          requestFailed: false,
      }
  }

  componentDidMount() {
      fetch(urlTMDBmovie)
          .then(response => {
              if (!response.ok) {
                  throw Error("Ошибка запроса")
              }

              return response;
          })
          .then(data => data.json())
          .then(data => {
              this.setState({
                  getData: data,
              }, () => {
                  console.log("data", this.state.getData)
              });
          }, () => {
              this.setState({
                  requestFailed: true,
              })
          })
  }

  render() {
      if(this.state.requestFailed) return <p>Failed</p>
      if(!this.state.getData) return <p>Loading</p>
      return (
          <div className="STestComponent">
            <h2>
                { this.state.getData.title }
            </h2>
              <img src={ "https://image.tmdb.org/t/p/w500/" + this.state.getData.poster_path } alt=""/>
              <p>
                  { this.state.getData.tagline }
              </p>
              <p>
                  { this.state.getData.overview }
              </p>
          </div>
      )
  }

}

export default TestComponent;
