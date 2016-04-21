var Promise = require('bluebird').config({longStackTraces: false, warnings: false}); // Promise polyfill for IE11 with warnings turned off
import {bootstrap} from 'aurelia-bootstrapper-webpack';
import 'bootstrap';    // for the nav-bar dropdown
import 'isomorphic-fetch';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../styles/styles.css';

import authConfig from './authConfig';

bootstrap(function(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-api', config => {
      config
        .registerEndpoint('github', 'https://api.github.com/')     // no Authorization headers
        .registerEndpoint('public', 'http://localhost:3000/api/')  // no Authorization headers
        .registerEndpoint('api', 'http://localhost:3000/api/users/me/')  // with Authorization headers for authneticated access to owned data
        .registerEndpoint('auth', 'http://localhost:3000/api/users/')    // with Authorization headers for authorization
        .setDefaultEndpoint('public');
    })
    .plugin('aurelia-authentication', config => {
      config.configure(authConfig);
    })

  aurelia.start().then(() => aurelia.setRoot('app', document.body));
});
