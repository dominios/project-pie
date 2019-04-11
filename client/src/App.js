import React, { Component } from 'react';
import io from 'socket.io-client';

import Mode from './mode/Mode';
import Indicators from './indicators/Indicators';
import './App.scss';
import { hexToRgb, rgbToHex } from './utils';
import ColorPicker from './colorPicker/ColorPicker';

const CONNECTION_CHECK_INTERVAL = 5000; // how often check for a new connection if not connected (ms)

class App extends Component {

  constructor(props) {
    super(props);

    const hostname = window.location.hostname;
    const port = 9000; //window.location.port;

    this.socket = io(`//${hostname}:${port}`, { autoConnect: false });

    this.socket.on('connect', () => {
      console.info('connected!');
      this.setState({ hasConnection: true });
    });

    this.socket.on('disconnect', () => {
      console.info('disconnected!');
      this.setState({ hasConnection: false });
    });

    this.socket.on('state', (message) => {
      console.info('state', message);
      const branch1 = message.currentMode.configuration.branch1;

      this.setState({
        color: rgbToHex(...branch1),
        currentMode: message.currentMode,
        availableModes: message.availableModes
      });
    });

    this.state = {
      hasConnection: false,
      currentMode: null,
      color: '#000000',
      availableModes: []
    }
  }

  checkConnection () {
    if (!this.state.hasConnection) {
      console.log('trying to connect...');
      this.socket.open();
    }
  }

  componentWillMount () {
    this.checkConnection();
    this.connectionCheckInterval = setInterval(() => {
      this.checkConnection();
    }, CONNECTION_CHECK_INTERVAL);
  }

  componentWillUnmount () {
    if (this.socket) {
      this.socket.disconnect();
    }
    clearInterval(this.connectionCheckInterval);
  }

  handleColorChange = (event) => {
    if (this.socket) {
      this.socket.emit('set', hexToRgb(event.currentTarget.value));
    }
  };

  handleNextMode = () => {
    if (this.socket) {
      this.socket.emit('next');
    }
  }

  handlePreviousMode = () => {
    if (this.socket) {
      this.socket.emit('previous');
    }
  }

  handleReset = () => {
    if (this.socket) {
      this.socket.emit('reset');
    }
  }

  handleSelectPreset = (preset) => {
    if (this.socket) {
      this.socket.emit('preset', preset);
    }
  }

  onPowerChange = (powerSetting) => {
    this.socket.emit('power', powerSetting);
  }

  render () {
    return (
      <div className="app">

        <header>
          <h1>Light Configurator</h1>
        </header>

        <Indicators
          currentMode={this.state.currentMode}
          hasConnection={this.state.hasConnection}
          onPowerChange={this.onPowerChange}
        />

        <Mode
          currentMode={this.state.currentMode}
          availableModes={this.state.availableModes}
          selectPreset={this.handleSelectPreset}
        />

        <ColorPicker
          color={this.state.color}
          onChange={this.handleColorChange}
        />

        <section className="brightness">
          <i className="far fa-lightbulb"></i>
          <div className="slider">
            <div className="handle"></div>
          </div>
          <i className="fas fa-lightbulb"></i>
        </section>

        <section className="buttons">

          <div>
            <i className="fas fa-redo" onClick={this.handleReset}></i>
          </div>

          <div>
            <i className="fas fa-angle-left" onClick={this.handlePreviousMode}></i>
          </div>

          <div>
            <i className="fas fa-angle-right" onClick={this.handleNextMode}></i>
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
