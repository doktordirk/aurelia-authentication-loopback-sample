// auth config when running on localhost
let configForDevelopment = {
  baseUrl: '',  // server url. already set in main.js to localhost:300/api
  httpInterceptor: true, // true=add auth token to all! http headers
  loginUrl: 'users/login',    // api login url
  signupUrl: 'users',  // api signup url
  profileUrl: 'users/me', // api profile url
  unlinkUrl: 'users/me/unlink/', // api unlink third-party url
  loginOnSignup: false,
  loginRedirect: '/#profile',  // internal aurelia redirect root
  signupRedirect: '/#confirmed', // internal aurelia redirect root
  tokenName: 'id',  // key of the token in api response. 'id' for loopback
  tokenPrefix: 'aurelia', // custom prefix for storage
  authToken: '',  // 'prefix' for header token. ''=empty for loopback

  providers: {
    facebook: {
      name: 'facebook',
      url: 'users/facebook',  // api route to facebook methods
      clientId: '937004143046787',  // id of the facebook app
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      redirectUri: window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/',
      scope: ['email'],  // requested permissions
      scopeDelimiter: ',',
      nonce: function() {
        return Math.random();
      },
      requiredUrlParams: ['nonce', 'display', 'scope'],
      display: 'popup',
      type: '2.5',
      popupOptions: { width: 580, height: 400 }
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
