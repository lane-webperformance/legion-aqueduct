'use strict';

const React = require('react');
const e = require('react').createElement;
const classNames = require('classnames');

class TagSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  isSelected(t) {
    if( !(this.props.selection) || !t )
      return false;

    if( !this.props.query.pathPrefixOf(t) )
      return false;

    return t.pathEquals(this.props.selection);
  }

  handleChange(t) {
    if( this.isSelected(t) )
      t = null;

    this.props.onChange(t);
  }

  render() {
    return e('div', {},
      e('p', { className: 'menu-header'}, 'Tags:'),
      this.props.enumerate(this.props.blob, this.props.query).map(t =>
        e('span', {
          href: '#',
          className: classNames({
            'menu-item': true,
            'selected': this.isSelected(t)
          }),
          key: t.toString(),
          onClick: () => this.handleChange(t),
          value: t.toString()
        }, t.toString()))
    );
  }
}

module.exports = TagSelector;
module.exports.axes = (_blob, query) => query.axes();
module.exports.tags = (_blob, query) => query.tags();
module.exports.values = (_blob, query) => query.values();
