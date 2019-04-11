import React from 'react';
import PropTypes from 'prop-types';

class ColorPicker extends React.Component {
    render () {
        return (<section className="colorPicker">
            <input type="color" value={this.props.color} onChange={this.props.onChange} />
            <div className="indicator" style={{ background: this.props.color, color: this.props.color }}>
                <i className="fas fa-eye-dropper"></i>
            </div>
        </section>)
    }

}

ColorPicker.defaultProps = {
    color: '#000000'
}

ColorPicker.propTypes = {
    color: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default ColorPicker;
