import React, { PropTypes, Component } from 'react';
import GaugeBase from './GaugeBase';

export default class GaugeTicks extends GaugeBase {
  render() {
    const fontSize = Math.round(this.size / 16);
    const majorDelta = this.range / (this.props.majorTicks - 1);
    let out = [];
    for(var major = this.props.min;
        major <= this.props.max;
        major += majorDelta)
    {
      const minorDelta = majorDelta / this.props.minorTicks;
      for(var minor = major + minorDelta;
          minor < Math.min(major + majorDelta, this.props.max);
          minor += minorDelta)
      {
        let point1 = this._valueToPoint(minor, 0.75);
        let point2 = this._valueToPoint(minor, 0.85);
        out.push(
          <line key={`ml${minor}`}
            x1={point1.x} y1={point1.y}
            x2={point2.x} y2={point2.y}
            stroke="#666" strokeWidth={1} />
        );
      }

      let point1 = this._valueToPoint(major, 0.7);
      let point2 = this._valueToPoint(major, 0.85);
      out.push(
        <line key={`l${major}`}
          x1={point1.x} y1={point1.y}
          x2={point2.x} y2={point2.y}
          stroke="#333" strokeWidth={2} />
      );

      if (major == this.props.min || major == this.props.max)
      {
        let point = this._valueToPoint(major, 0.63);
        out.push(
          <text key={`t${major}`}
            x={point.x} y={point.y}
            dy={fontSize / 3}
            textAnchor={major == this.props.min ? "start" : "end"}
            style={{
              fontSize: fontSize,
              fill: "#333",
              strokeWidth: 0
            }}>
            {major}
          </text>
        );
      }
    }

    return (<g>
      {out}
    </g>);
  }
}

GaugeTicks.PropTypes = {
  majorTicks: React.PropTypes.number,
  minorTicks: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number
};
