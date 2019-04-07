import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

import './App.scss';

class App extends Component {

  componentWillMount () {
    document.body.requestFullscreen();
  }

  handleClick = () => {
    fetch('/api/v1/random')
      .then(function (response) {
        console.info('fetch response', response);
      });
  }

  handleChangeComplete = (e) => {
    console.info(e);
    fetch('/api/v1/set', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.rgb)
    })
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

        <ChromePicker
          onChangeComplete={this.handleChangeComplete}
          disableAlpha={true}
        />

        {/* <button className="toggle" onClick={this.handleClick}>
          <i className="fas fa-power-off"></i>
        </button> */}

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
