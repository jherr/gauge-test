import React, { PropTypes, Component } from 'react';
import GaugeBase from './GaugeBase';
import GaugeLabel from './GaugeLabel';
import GaugeValue from './GaugeValue';
import GaugeZone from './GaugeZone';
import GaugeTicks from './GaugeTicks';
import GaugePointer from './GaugePointer';

export default class Gauge extends GaugeBase {
  render() {
    return (
      <svg className="gauge" width={this.size} height={this.size}>
        <circle cx={this.cx} cy={this.cy}
          r={this.state.radius} fill="#ccc" stroke="#000"
          strokeWidth={0.5} />
        <circle cx={this.cx} cy={this.cy}
          r={0.9 * this.radius} fill="#fff" stroke="#e0e0e0"
          strokeWidth={2} />
        {this.props.greenZones.map((zone, index) =>
          <GaugeZone key={`g${index}`} {... this.props} color={this.props.greenColor} zone={zone} />
        )}
        {this.props.yellowZones.map((zone, index) =>
          <GaugeZone key={`y${index}`} {... this.props} color={this.props.yellowColor} zone={zone} />
        )}
        {this.props.redZones.map((zone, index) =>
          <GaugeZone key={`r${index}`} {... this.props} color={this.props.redColor} zone={zone} />
        )}
        <GaugeTicks {... this.props} />
        <GaugeLabel {... this.props} />
        <GaugePointer {... this.props} />
        <circle cx={this.cx} cy={this.cy}
          r={0.12 * this.radius} fill="#4684EE"
          stroke="#666" opacity={1} />
        <GaugeValue value={this.state.value} {... this.props} />
      </svg>
    );
  }
}

Gauge.propTypes = {
  size: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  majorTicks: React.PropTypes.number,
  minorTicks: React.PropTypes.number,
  greenColor: React.PropTypes.string,
  yellowColor: React.PropTypes.string,
  redColor: React.PropTypes.string,
  label: React.PropTypes.string,
  velocity: React.PropTypes.number,
  greenZones: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      from: React.PropTypes.number.isRequired,
      to: React.PropTypes.number.isRequired
    })),
  yellowZones: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      from: React.PropTypes.number.isRequired,
      to: React.PropTypes.number.isRequired
    })),
  redZones: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      from: React.PropTypes.number.isRequired,
      to: React.PropTypes.number.isRequired
    }))
};

Gauge.defaultProps = {
  min: 0,
  max: 100,
  majorTicks: 5,
  minorTicks: 2,
  greenColor: "#109618",
  yellowColor: "#FF9900",
  redColor: "#DC3912",
  label: "",
  velocity: 0.1,
  greenZones: [],
  yellowZones: [],
  redZones: []
};
