import React from 'react';
import PropTypes from 'prop-types';

class Indicators extends React.Component {

    getPowerClassName () {
        const classes = ['fa', 'fa-2x', 'fa-fw', 'fa-power-off'];
        try {
            if (this.props.currentMode.name !== 'Off') {
                return classes.concat('text-white');
            }
            throw new Error('is not offline');
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
            <i className={this.getPowerClassName().join(' ')}></i>
            <i className={this.getWifiClassName().join(' ')}></i>
        </section>);
    }

}

Indicators.propTypes = {
    hasConnection: PropTypes.bool.isRequired,
    currentMode: PropTypes.any
}

export default Indicators;
