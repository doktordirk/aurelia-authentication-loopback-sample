import 'bootstrap';
import 'fetch';  // fetch polyfill

import authConfig from './authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging() // enable debug logging
    .plugin('aurelia-api', config => {
      config
        .registerEndpoint('github', 'https://api.github.com/')
        .registerEndpoint('public', 'http://localhost:3000/api/')  // no Authorization headers
        .registerEndpoint('api', 'http://localhost:3000/api/')     // with Authorization headers for rest access
        .registerEndpoint('auth', 'http://localhost:3000/api/')    // with Authorization headers for authorization
        .setDefaultEndpoint('public');
    })
    .plugin('aurelia-authentication', config => {
      config.configure(authConfig);
    })
    .plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
