import React from 'react';
import { CustomPicker, ChromePicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

class ColorPicker extends React.Component {
    render () {
        return (<div>
            <ChromePicker />
        </div>
        );
    }
}

export default CustomPicker(ColorPicker);
