import 'bootstrap';
import 'fetch';  // fetch polyfill

import authConfig from './authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging() // enable debug logging
    .plugin('spoonx/aurelia-api', config => {
      config.useStandardConfiguration().withBaseUrl('http://localhost:3000/api/');
    })
    .plugin('spoonx/aurelia-auth', config => {
      config.configure(authConfig);
    })
    .plugin('aurelia-i18n', instance => {
      instance.setup({});
    })
    .plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());
}
