import React from 'react';
import PropTypes from 'prop-types';

class Mode extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    getName () {
        try {
            return this.props.currentMode.name;
        } catch (e) {
            return 'Not Available';
        }
    }

    renderPresetPreview (preset) {

        const branch1 = preset.configuration.branch1;
        const clr = `rgb(${branch1[0]}, ${branch1[1]}, ${branch1[2]})`;

        return (<li onClick={() => this.props.selectPreset(preset)}>
            <span className="preview" style={{ background: clr }}></span>
            <span className="name">{preset.name}</span>
        </li>);
    }

    render () {
        return (<section className="preset" onClick={() => this.setState({ open: !this.state.open })}>
            <span>{this.getName()}</span> <i className="fas fa-caret-down"></i>
            <ul className={`menu ${this.state.open ? 'open' : ''}`}>
                {this.props.availableModes.map(this.renderPresetPreview.bind(this))}
            </ul>
        </section>)
    }

}

Mode.defaultProps = {
    selectPreset: () => null
}

Mode.propTypes = {
    currentMode: PropTypes.any,
    availableModes: PropTypes.array.isRequired,
    selectPreset: PropTypes.func
}

export default Mode;
