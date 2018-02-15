'use strict';

require('./index.css');

const React = require('react');
const e = require('react').createElement;

const capture = require('legion-capture/browser');
const metrics = require('legion-metrics');
const TIMEOUT_MILLIS = 5000;

const ConnectionInfoForm = require('./ConnectionInfoForm');
const TagSelector = require('./TagSelector');
const SingleValueDisplay = require('./SingleValueDisplay');
const CsvDisplay = require('./CsvDisplay');

const url_params = new URLSearchParams(window.location.search);

const DEFAULT_CONNECTION_INFO = {
  capture_endpoint: url_params.get('capture_endpoint') || 'http://localhost:8510',
  project_key: url_params.get('project_key') || 'default'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection_info : DEFAULT_CONNECTION_INFO,
      blob : null,
      by_minutes : [],
      error : 'connecting...',
      selected_axis : null,
      selected_tag : null,
      selected_value : null
    };
    this.background_loader = null;
    this.table_background_loader = null;
  }

  async refreshUpstreamBlob() {
    if( this.background_loader )
      return;

    const request_params = { project_key: this.state.connection_info.project_key };
    const client = capture.client.remote.create(this.state.connection_info.capture_endpoint);

    try {
      const result = await capture.get(client).byMinutes(request_params);

      result.all = await result.all;
      this.setState({ blob: result.all, by_minutes: result.minutes, error: null });
    } catch(err) {
      this.setState({ blob: null, by_minutes: [], error: err.message });
    } finally {
      this.background_loader = null;
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.background_loader = this.refreshUpstreamBlob();
    },TIMEOUT_MILLIS);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return e('div', {},
      e(ConnectionInfoForm, {
        value: this.state.connection_info,
        onChange: (connection_info) => this.setState({connection_info, blob: null, table: []})
      }),
      e('pre', {}, this.state.error ? this.state.error : 'connected'),
      (this.state.blob && this.state.blob.data) ? e(TagSelector, {
        blob: this.state.blob,
        query: metrics.untag(this.state.blob, ['data']),
        selection: this.state.selected_axis,
        enumerate: TagSelector.axes,
        onChange: (selected_axis) => this.setState({selected_axis, selected_tag: null, selected_value: null})
      }) : e('pre', {}, 'no tags loaded'),
      (this.state.blob && this.state.selected_axis) ? e(TagSelector, {
        blob: this.state.blob,
        query: this.state.selected_axis,
        selection: this.state.selected_tag,
        enumerate: TagSelector.tags,
        onChange: (selected_tag) => this.setState({selected_tag, selected_value: null})
      }) : e('pre', {}, 'no tags loaded'),
      (this.state.blob && this.state.selected_axis && this.state.selected_tag) ? e(TagSelector, {
        blob: this.state.blob,
        query: this.state.selected_tag,
        selection: this.state.selected_value,
        enumerate: TagSelector.values,
        onChange: (selected_value) => this.setState({selected_value})
      }) : e('pre', {}, 'no values loaded'),
      (this.state.blob && this.state.selected_axis && this.state.selected_tag && this.state.selected_value) ? e(SingleValueDisplay, {
        blob: this.state.blob,
        query: this.state.selected_value
      }) : ('pre', {}, 'no summary statistics loaded'),
      (this.state.blob && this.state.by_minutes && this.state.selected_axis && this.state.selected_tag && this.state.selected_value) ? e(CsvDisplay, {
        blob: this.state.blob,
        by_minutes: this.state.by_minutes,
        query: this.state.selected_value
      }) : ('pre', {}, 'no time-series statistics loaded'));
  }
}

module.exports = App;
