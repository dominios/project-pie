import React from 'react';
import PropTypes from 'prop-types';

class Indicators extends React.Component {

    isPowerOn () {
        return !(this.props.currentMode.off === true);
    }

    getPowerClassName () {
        const classes = ['fa', 'fa-2x', 'fa-fw', 'fa-power-off'];
        try {
            if (this.isPowerOn()) {
                return classes.concat('text-white');
            }
            throw new Error('is offline');
        } catch (e) {
            return classes.concat('text-muted');
        }
    }

    getWifiClassName () {
        const classes = ['fa', 'fa-2x', 'fa-fw', 'fa-wifi'];
        if (this.props.hasConnection) {
            return classes.concat(['text-success']);
        }
        return classes.concat(['text-danger', 'blinking']);
    }

    render () {
        return (<section className="indicators">
            <i className={this.getPowerClassName().join(' ')} onClick={() => this.props.onPowerChange(!this.isPowerOn())}></i>
            <i className={this.getWifiClassName().join(' ')}></i>
        </section>);
    }

}

Indicators.propTypes = {
    hasConnection: PropTypes.bool.isRequired,
    currentMode: PropTypes.any,
    onPowerChange: PropTypes.func
}

export default Indicators;
