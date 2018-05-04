// we want font-awesome to load as soon as possible to show the fa-spinner
import '../static/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });


import authConfig from './authConfig';

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-api'), config => {
      config
        .registerEndpoint('github', 'https://api.github.com/')     // no Authorization headers
        .registerEndpoint('public', 'http://localhost:3000/api/')  // no Authorization headers
        .registerEndpoint('api', 'http://localhost:3000/api/users/me/')  // with Authorization headers for authneticated access to owned data
        .registerEndpoint('auth', 'http://localhost:3000/api/users/')    // with Authorization headers for authorization
        .setDefaultEndpoint('public');
    })
    .plugin(PLATFORM.moduleName('aurelia-authentication'), config => {
      config.configure(authConfig);
    });


  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
