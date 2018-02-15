'use strict';

const React = require('react');
const e = require('react').createElement;
const uuidv3 = require('uuid/v3');

//const csvStringify = require('csv-stringify');

class CsvDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: []
    };
  }

  componentDidMount() {
    this.loadDataByMinute();
  }

  componentWillUnmount() {
  }

  async loadDataByMinute() {
    const queries = [];
    queries.push(this.props.query.size());
    queries.push(this.props.query.minimum());
    queries.push(this.props.query.average());
    queries.push(this.props.query.maximum());

    const header = ['metadata.min_timestamp', 'metadata.max_timestamp'];
    for( const query of queries )
      header.push(query.toString());

    const table = [header];
    this.setState({ table });
    for( const minute of this.props.by_minutes ) {
      const row = [];
      const minute_blob = await minute;
      row.push(minute_blob.metadata.min_timestamp);
      row.push(minute_blob.metadata.max_timestamp);
      for( const query of queries ) {
        row.push(query.withRootBlob(minute_blob).measurement());
      }
      table.push(row);
      this.setState({ table });
    }
  }

  render() {
    const ns = 'cd2cbc43-ec40-44e6-9289-839f0fdb8250';
    const trk = (tr,i) => uuidv3(JSON.stringify([i,tr]), ns);
    const tdk = (td,i,j) => uuidv3(JSON.stringify([i,j,td]), ns);

    return e('table', {}, e('tbody', {},
      this.state.table.map((tr, i) => e('tr', { key: trk(tr,i) },
        tr.map((td,j) => e('td', { key: tdk(tr,i,j) }, td))))));
    //return e('pre', {}, this.state.table.map(r => r.join(' ')).join('\n'));
  }
}

module.exports = CsvDisplay;
