import React, { PropTypes, Component } from 'react';
import styles from './ContactPage.css';
import withStyles from '../../decorators/withStyles';
import Gauge from "../Gauge/Gauge";

@withStyles(styles)
class ContactPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: [30, 40, 50]
    };

    this._changeValue = this._changeValue.bind(this);
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  _changeValue() {
    this.setState({
      value: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ]
    });
  }

  render() {
    const title = 'Gauge Test';
    this.context.onSetTitle(title);
    return (
      <div style={{margin:20}}>
        {this.state.value.map((v, i) => (
          <Gauge size={100}
            label={`G${i+1}`}
            key={i}
            value={v}
            yellowZones={[{from: 70, to: 90}]}
            redZones={[{from: 90, to: 100}]} />
        ))}
        <div style={{marginTop: 20}}>
          <button onClick={this._changeValue}>Change!</button>
        </div>
      </div>
    );
  }
}

export default ContactPage;
