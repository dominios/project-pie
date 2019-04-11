import React from 'react';
import PropTypes from 'prop-types';

class Mode extends React.Component {

    getName () {
        try {
            return this.props.currentMode.name;
        } catch (e) {
            return 'Not Available';
        }
    }

    render () {
        return (<section className="preset">
            <span>{this.getName()}</span> <i className="fas fa-caret-down"></i>
        </section>)
    }

}

Mode.propTypes = {
    currentMode: PropTypes.any
}

export default Mode;
