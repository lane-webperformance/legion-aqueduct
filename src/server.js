'use strict';

const app = require('./express');  // dot slash express, pay attention :)

function main() {
  app({}).listen(8080, () => console.log('Test server listening on http://localhost:8080.')); //eslint-disable-line no-console
}

main();
