import React, { PropTypes, Component } from 'react';
import GaugeBase from './GaugeBase';

export default class GaugeValue extends GaugeBase {
  render() {
    const fontSize = Math.round(this.size / 10);
    return (
      <text x={this.cx}
        y={this.size - this.cy / 4 - fontSize}
        dy={fontSize / 2}
        textAnchor="middle"
        style={{
          fontSize,
          fill: "#000",
          strokeWidth: 0
        }}>
        {Math.round(this.props.value)}
      </text>
    );
  }
}

GaugeValue.PropTypes = {
  value: React.PropTypes.number
};
