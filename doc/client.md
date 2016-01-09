# Aurelia-auth-loopback-sample

## Aurelia client
- /client : the Aurelia client app project based on aurelia-skelton-app 1.0.0-beta.1.0.4 and paulvanbladel's work.
- /src : base views and configuration files for the router and aurelia-auth
- /src/modules : single main views. particularly the customers view for unauthorized users
- /src/modules/auth : user authentification files eg signup, login ..
- /src/modules/customer : customer management for authenticated users

##### main.js
setup aurelia-api with a baseUrl and configure aurelia-auth.

##### authConfig.js
configuration for aurelia-auth to match put loopback server. Have a look in there. Since we added the short cut /users/me for /users/:userid above, we can use that to access eg the profile.
```
unlinkUrl: 'users/me/unlink/',         // the unlike route we set above
providers: {
    clientId: 'your facebook App ID',  // id of the facebook app
    url: 'users/facebook',             // api route to facebook methods we set above
...
}
```
##### main.js
basic config for the fetch client for aurelia-auth-sample.

##### app.router.config.js
adding the property `auth` to the routes and adding the pipeline step `AuthorizeStep` from aurelia-auth. This will hide those routes for unauthorized users.

##### auth/*
Uses the login/signup methods of aurelia-auth-sample.

##### customers/*
Uses aurelia-api for CRUD. Since we set `httpInterceptor:true` in `authConfig.js`, the authorization token is added to all request. Users can only edit their own customers as defined in `/common/models/user.json`.

## Limitations
spoonx/aurelia-api does not provide multiple endpoints yet. Thus switching endpoints is cumbersome and currently always send your token.

## Plans
- Better scripts
- Email verification per pasting token
- Simple multiple endpoints using hopefully coming [spoonx/aurelia-api](https://github.com/SpoonX/aurelia-api) improvements
- Email templates