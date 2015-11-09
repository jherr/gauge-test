import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import GaugeBase from './GaugeBase';

export default class GaugeZone extends GaugeBase {
  render() {
    return (
      <path
        key={this.props.key}
        fill={this.props.color}
        d={d3.svg.arc()
          .startAngle(this._valueToRadians(this.props.zone.from))
          .endAngle(this._valueToRadians(this.props.zone.to))
          .innerRadius(0.65 * this.radius)
          .outerRadius(0.85 * this.radius)()}
        transform={
          `translate(${this.cx},${this.cy}) rotate(270)`
        } />
    );
  }
}

GaugeZone.PropTypes = {
  color: React.PropTypes.string,
  zone: React.PropTypes.shape({
    from: React.PropTypes.number.isRequired,
    to: React.PropTypes.number.isRequired
  })
};
