import React, { Component } from 'react';
import './App.scss';

class App extends Component {

  handleClick = () => {
    fetch('/api/toggle')
      .then(function (response) {
        console.info('fetch response', response);
      });
  }

  render () {
    return (
      <div className="app">

        <header>
          <h1>Light Configurator</h1>
        </header>

        <section className="indicators">
          <i className="fas fa-2x fa-fw fa-power-off text-white"></i>
          <i className="fas fa-2x fa-fw fa-wifi text-danger blinking"></i>
          {/* <i className="fas fa-2x fa-fw fa-wifi text-success"></i> */}
        </section>

        <section className="preset">
          <span>TV Mode</span> <i className="fas fa-caret-down"></i>
        </section>

        <button className="toggle" onClick={this.handleClick}>
          <i className="fas fa-power-off"></i>
        </button>

        <section className="brightness">
          <i className="far fa-lightbulb"></i>
          <div className="slider">
            <div className="handle"></div>
          </div>
          <i className="fas fa-lightbulb"></i>
        </section>

        <section className="buttons">

          <div>
            <i className="fas fa-redo"></i>
          </div>

          <div>
            <i className="fas fa-angle-left"></i>
          </div>

          <div>
            <i className="fas fa-angle-right"></i>
          </div>

          <div>
            <i className="fas fa-palette"></i>
          </div>

        </section>

      </div>
    );
  }
}

export default App;
