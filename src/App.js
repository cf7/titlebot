import React from 'react';
// import logo from './logo.svg';

import './App.css';


import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  handleClick = () => {
    axios.get('https://ted.com/')
      .then((response) => {
        console.log("submitted");
        console.log((typeof response.data));
        console.log(response.data.match(/(<title.*>).*(<\/title>)/));
        let data1 = response.data.match(/(<title.*>).*(<\/title>)/);
        console.log(data1);
        // let data2 = data1[0].match(/(>).*(<\/)/);
        // console.log(data2);
        let title = data1[0].match(/[>](.*)[<][/]/)[1];
        this.setState({ title: title });
      }).catch((e) => {
        console.error(e);
      });
  }

  render = () => {
    return (
      <div className="App">
        
        <div className="output">
          { this.state.title }
        </div>
        <button type="submit" onClick={this.handleClick}>Submit</button>

      </div>
    );
  }
}