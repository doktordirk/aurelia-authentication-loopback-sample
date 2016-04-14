import 'bootstrap';
import 'fetch';  // fetch polyfill

import authConfig from './authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging() // enable debug logging
    .plugin('aurelia-api', config => {
      config
        .registerEndpoint('api', 'http://localhost:3000/api/')
        .registerEndpoint('auth', 'http://localhost:3000/api/')
        .setDefaultEndpoint('api');
    })
    .plugin('spoonx/aurelia-authentication', config => {
      config.configure(authConfig);
    })
    .plugin('aurelia-i18n', instance => {
      instance.setup({
        resGetPath: 'locale/__lng__/__ns__.json',
        lng: 'en',
        attributes: ['t', 'i18n'],
        getAsync: true,
        sendMissing: false,
        fallbackLng: 'en',
        debug: true
      });
    })
    .plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());
}
