import React, { Component } from 'react';
import './App.css';

class App extends Component {

  handleClick = () => {
    fetch('/api/toggle')
      .then(function (response) {
        console.info('fetch response', response);
      });
  }

  render () {
    return (
      <button className="toggle" onClick={this.handleClick}>
      </button>
    );
  }
}

export default App;
