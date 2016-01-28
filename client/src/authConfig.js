// auth config when running on localhost
let configForDevelopment = {
  endpoint: 'auth',
  configureEndpoints: ['auth'],
  baseUrl: '',  // server url. already set in main.js to localhost:300/api
  httpInterceptor: true, // true=add auth token to httpInterceptor
  loginUrl: 'users/login',    // api login url
  signupUrl: 'users',  // api signup url
  profileUrl: 'users/me', // api profile url
  unlinkUrl: 'users/me/unlink/', // api unlink third-party url
  loginOnSignup: false,
  loginRedirect: '/#profile',  // internal aurelia redirect root
  signupRedirect: '/#confirm', // internal aurelia redirect root
  responseTokenProp: 'id',  // key of the token in api response. 'id' for loopback
  tokenPrefix: 'aurelia', // custom prefix for storage
  authToken: '',  // 'prefix' for header token. ''=empty for loopback

  providers: {
    facebook: {
      name: 'facebook',
      url: 'users/facebook',  // api route to facebook methods
      clientId: '937004143046787',  // id of the facebook app
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      scope: ['email'],  // requested permissions
      type: '2.5'
    },
    google: {
      name: 'google',
      url: 'users/google',
      clientId: '569253544793-jg6vhjl8q9h7blta967pdv0ao4qmlrra.apps.googleusercontent.com',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      scope: ['profile', 'email'],
      type: '2.0'
    }
  }
};

// auth config when running on host (eg openshift)
let configForProduction = {
  providers: {
    facebook: {
      clientId: 'App ID'
    }

  }
};

// select config based on url
let config;
if (window.location.hostname === 'localhost') {
  config = configForDevelopment;
} else {
  config = configForProduction;
}

export default config;
