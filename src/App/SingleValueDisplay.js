'use strict';

const React = require('react');
const e = require('react').createElement;

class SingleValueDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const query = this.props.query;
    const measurements = [query.size(), query.minimum(), query.average(), query.maximum()];

    return e('div', {},
      measurements.map(m => e('p', { key: m.measurementName() }, m.measurementName() + ': ' + m.measurement().toString())));
  }
}

module.exports = SingleValueDisplay;
