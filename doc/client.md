# Aurelia-auth-loopback-sample

## Aurelia client
- /client : the Aurelia client app project based on aurelia-skelton-app 1.0.0-beta.1.0.4 and paulvanbladel's work.
- /src : base views and configuration files for the router and aurelia-auth
- /src/modules : single main views. particularly the customers view for unauthorized users
- /src/modules/auth : user authentification files eg signup, login ..
- /src/modules/customer : customer management for authenticated users
- /src/modules/user : user management for admin users

##### authConfig.js
configuration for aurelia-auth to match put loopback server. Have a look in there. Since we added the short cut /users/me for /users/:userid above, we can use that to access eg the profile.
```
...
endpoint: 'auth',					   // the aurelia-api endpoint for aurelia-auth
configureEndpoints: ['auth'],          // aurelia-api endpoints for auth to configure 
...
unlinkUrl: 'users/me/unlink/',         // the unlike route we set above
providers: {
    clientId: 'your facebook App ID',  // id of the facebook app
    url: 'users/facebook',             // api route to facebook methods we set above
...
}
```
##### main.js
Plugin configs for the aurelia-api and aurelia-auth.

##### app.router.config.js
adding the property `auth` to the routes and adding the pipeline step `AuthorizeStep` from aurelia-auth. This will hide those routes for unauthorized users. Adding settings.admin and AdminStep hides admin pages for users without that role. 

##### auth/*
Uses the login/signup methods of aurelia-auth-sample with some additional authorization and role releated features.

##### customer/*
Uses aurelia-api for CRUD. Since we configured in `authConfig.js` with `httpInterceptor:true` and the configureEndpoints:['auth'], the authorization token is added to all request. Users can only edit their own customers as defined in `/common/models/user.json`.

##### user/*
Admin pages. Users with the admin role can edit users as defined in `/common/models/user.json`.

## Limitations
The admin role has too general permissions, including deleting other admins.
