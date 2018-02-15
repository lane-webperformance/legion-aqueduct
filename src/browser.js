'use strict';

const ReactDOM = require('react-dom');
const e = require('react').createElement;
const App = require('./App');

require('./index.css');

function main() {
  ReactDOM.render(
    e('div', { className: 'root' }, e(App, {})),
    document.querySelector('body'));
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});
