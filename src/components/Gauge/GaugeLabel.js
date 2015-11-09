import React, { PropTypes, Component } from 'react';
import GaugeBase from './GaugeBase';

export default class GaugeLabel extends GaugeBase {
  render() {
    const fontSize = Math.round(this.size / 9);
    return (
      <text
        x={this.cx}
        y={this.cy / 2 + fontSize / 2}
        dy={fontSize / 2}
        textAnchor="middle"
        style={{
          fontSize,
          fill: "#333",
          strokeWidth: 0
        }}
        >
        {this.props.label}
      </text>
    );
  }
}

GaugeLabel.PropTypes = {
  label: React.PropTypes.string
};
