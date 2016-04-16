# aurelia-authentication-loopback-sample

## Aurelia client

- /client : the Aurelia client app.
- /src : base views and configuration files for the router and aurelia-authentication
- /src/modules/auth : user authentification files eg signup, login ..
- /src/modules/customer : customer management for authenticated users

### authConfig.js

configuration for aurelia-authentication to match put loopback server. Have a look in there. Since we added the short cut /users/me for /users/:userid above, we can use that to access eg the profile.

```js
...
endpoint: 'auth',                      // the aurelia-api endpoint for aurelia-authentication
configureEndpoints: ['auth'],          // aurelia-api endpoints for authentication to configure
...
unlinkUrl: 'users/me/unlink/',         // the unlike route we set above
providers: {
    clientId: 'your facebook App ID',  // id of the facebook app
    url: 'users/facebook',             // api route to facebook methods we set above
...
}
```

### main.js

Plugin configs for the aurelia-api and aurelia-authentication.

### app.js

Adding the property `auth` to the routes and adding the pipeline step `AuthorizeStep` from aurelia-authentication. This will hide those routes for unauthorized users.

### auth/*

Uses the login/signup views and view-models.

### customer/*

Uses aurelia-api for CRUD. Since we configured in `authConfig.js` with `httpInterceptor:true` and the configureEndpoints:['auth'], the authorization token is added to all request. Users can only edit their own customers as defined in `/common/models/user.json`.
