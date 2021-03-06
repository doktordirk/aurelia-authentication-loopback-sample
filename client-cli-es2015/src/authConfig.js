// auth config when running on localhost
export default {
  endpoint: 'auth',   // use 'auth' as endpoint for aurelia-authentication
  configureEndpoints: ['auth', 'api'],  // add Authorization headers to those for authenticated requests
  baseUrl: '',  // server url. already set in main.js to localhost:300/api
  httpInterceptor: true, // true=add auth token to httpInterceptor
  loginUrl: 'login',    // api login url
  signupUrl: 'users',  // api signup url
  profileUrl: 'me', // api profile url
  unlinkUrl: 'me/unlink/', // api unlink third-party url
  loginOnSignup: false,
  loginRedirect: '#/profile',  // internal aurelia redirect root
  signupRedirect: '#/login', // internal aurelia redirect root
  logoutRedirect: '#/login',
  expiredRedirect: 1,
  loginRoute: '/login',
  authToken: '',  // 'prefix' for header token. ''=empty for loopback
  useRefreshToken: true,

  providers: {
    facebook: {
      name: 'facebook',
      url: 'facebook',  // api route to facebook methods
      clientId: '937004143046787',  // id of the facebook app
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      scope: ['email'],  // requested permissions
      type: '2.5'
    },
    google: {
      name: 'google',
      url: 'google',
      clientId: '569253544793-jg6vhjl8q9h7blta967pdv0ao4qmlrra.apps.googleusercontent.com',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      scope: ['profile', 'email'],
      type: '2.0'
    }
  }
};
