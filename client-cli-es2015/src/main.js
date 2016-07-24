import environment from './environment';
import "bootstrap";
import authConfig from './authConfig';

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
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
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
