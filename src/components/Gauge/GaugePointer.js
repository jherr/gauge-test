import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import {VictoryAnimation} from 'victory-animation';
import GaugeBase from './GaugeBase';

export default class GaugePointer extends GaugeBase {
  constructor(props) {
    super(props);
    this.state.value = props.value;
    this._buildPointerPath = this._buildPointerPath.bind(this);
  }

  _buildPointerPath(value) {
    const delta = this.range / 13;

    let self = this;
    let _localPointConvert = (value, factor) => {
      let point = self._valueToPoint(value, factor);
      point.x -= self.cx;
      point.y -= self.cy;
      return point;
    }

    const head = _localPointConvert(value, 0.85);
    const head1 = _localPointConvert(value - delta, 0.12);
    const head2 = _localPointConvert(value + delta, 0.12);

    const tailValue = value - (this.range * (1/(270/360)) / 2);
    const tail = _localPointConvert(tailValue, 0.28);
    const tail1 = _localPointConvert(tailValue - delta, 0.12);
    const tail2 = _localPointConvert(tailValue + delta, 0.12);

    return [head, head1, tail2, tail, tail1, head2, head];
  }

  render() {
    const pointerLine = d3.svg.line()
      .x(d => d.x).y(d => d.y).interpolate("basis");
    return (
      <VictoryAnimation
        data={{value: this.state.value}}
        velocity={this.props.velocity}>
        {(data) => {
          const pointerPath = this._buildPointerPath(data.value);
          return (
            <g className="pointerContainer">
              <path d={pointerLine(pointerPath)} fill="#dc3912" stroke="#c63310" fillOpacity={0.7} transform={`translate(${this.cx},${this.cy}) rotate(0)`} />
            </g>
          );
        }}
      </VictoryAnimation>
    );
  }

  componentWillReceiveProps(props) {
    if(props.value !== undefined) {
      this.setState({
        value: props.value
      });
    }
  }
}

GaugePointer.PropTypes = {
  value: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number
};

