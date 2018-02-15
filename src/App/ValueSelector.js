'use strict';

const React = require('react');
const e = require('react').createElement;

class ValueSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  handleChange(value) {
    for( const t of this.props.query.values() ) {
      if( t.toString() === value ) {
        this.setState({ selection: t });
        this.props.onChange(t);
      }
    }
  }

  render() {
    return e('div', {},
      e('p', {}, 'Values: '),
      e('select', { onChange: event => this.handleChange(event.target.value) },
        this.props.query.values().map(v => e('option', { key: v.toString(), value: v.toString() }, v.toString()))));
  }
}

module.exports = ValueSelector;
