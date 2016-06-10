import 'bootstrap';
import 'fetch';  // fetch polyfill
import {Aurelia} from 'aurelia-framework';

import {Config} from 'aurelia-api';
import {BaseConfig} from 'aurelia-authentication';
import authConfig from './authConfig';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging() // enable debug logging
    .plugin('aurelia-api', (config: Config) => {
      config
        .registerEndpoint('github', 'https://api.github.com/')     // no Authorization headers
        .registerEndpoint('public', 'http://localhost:3000/api/')  // no Authorization headers
        .registerEndpoint('api', 'http://localhost:3000/api/users/me/')  // with Authorization headers for authneticated access to owned data
        .registerEndpoint('auth', 'http://localhost:3000/api/users/')    // with Authorization headers for authorization
        .setDefaultEndpoint('public');
    })
    .plugin('aurelia-authentication', (authenticationConfig: BaseConfig) => {
      authenticationConfig.configure(authConfig);
    })
    .plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
