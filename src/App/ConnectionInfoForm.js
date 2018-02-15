'use strict';

const React = require('react');
const e = require('react').createElement;

class ConnectionInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.value;
  }

  handleChange(value) {
    this.setState(value);
    this.props.onChange(Object.assign({}, this.state, value));
  }

  render() {
    return e('form', { className: 'form' },
      e('p', {},
        'Capture Endpoint: ',
        e('input', {
          type:'url',
          value: this.state.capture_endpoint,
          onChange: (event) => this.handleChange({capture_endpoint: event.target.value})
        })),
      e('p', {},
        'Project Key: ',
        e('input', {
          type:'text',
          value: this.state.project_key,
          onChange: (event) => this.handleChange({project_key: event.target.value})
        })));
  }
}

module.exports = ConnectionInfoForm;
