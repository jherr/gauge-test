import React, { PropTypes, Component } from 'react';

export default class GaugeBase extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.size = props.size * 0.9;
    this.state.radius = this.state.size * 0.97 / 2;
    this.state.cx = this.state.size / 2;
    this.state.cy = this.state.size / 2;
    this.state.range = props.max - props.min;

    this._valueToPoint = this._valueToPoint.bind(this);
    this._valueToDegrees = this._valueToDegrees.bind(this);
    this._valueToRadians = this._valueToRadians.bind(this);
  }

  get cx() {
    return this.state.cx;
  }

  get cy() {
    return this.state.cy;
  }

  get size() {
    return this.state.size;
  }

  get radius() {
    return this.state.radius;
  }

  get range() {
    return this.state.range;
  }

  _valueToDegrees(value) {
    return value / this.range * 270 - (this.props.min / this.range * 270 + 45);
  }

  _valueToRadians(value) {
    return this._valueToDegrees(value) * Math.PI / 180;
  }

  _valueToPoint(value, factor) {
    return {
      x: this.cx - this.radius * factor * Math.cos(this._valueToRadians(value)),
      y: this.cy - this.radius * factor * Math.sin(this._valueToRadians(value))
    };
  }
}

GaugeBase.propTypes = {
  size: React.PropTypes.number.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number
};

GaugeBase.defaultProps = {
  min: 0,
  max: 100
};
