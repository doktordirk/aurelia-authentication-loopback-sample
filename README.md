# Aurelia-auth-loopback-sample
This is (goint to be) a skeleton for an [Aurelia](http://aurelia.io/) client using [spoonx/aurelia-auth](https://github.com/SpoonX/aurelia-auth) for authorized access to a [Strongloop](http://loopback.io/) loopback api server based on paul van bladel's [aurelia-loopback-sample](https://github.com/paulvanbladel/aurelia-loopback-sample/) and [aurelia-auth-sample](https://github.com/paulvanbladel/aurelia-auth-sample/)

[loopback-component-satellizer](https://www.npmjs.com/package/loopback-component-satellizer) is used to handle third-party authorization on the server side.

Comments on aurelia gitter and push requests welcome.
..

This version uses [spoonx/aurelia-api](https://github.com/SpoonX/aurelia-api) and [spoonx/aurelia-auth](https://github.com/SpoonX/aurelia-auth) for authorized rest api access.

## Installation instructions
```
git clone https://github.com/dirkeisinger/aurelia-auth-loopback-sample
cd aurelia-auth-loopback-sample
npm install
cd client
npm install
jspm install
```
### Configuration
#### Third-party login
Currently included is only facebook. But google+ and twitter are also included in [loopback-component-satellizer](https://www.npmjs.com/package/loopback-component-satellizer)

##### Facebook
You'll need a facebook developer account (developers.facebook.com). Add a new website app (skip quick start).
You'll find your facebook app credentials in `Settings->Basic`: App ID (which is public) and App Secret (which is private, so don't upload that one on github or alike). Set the website url there to eg `http:/localhost`. In `Settings->Advanced` in `Client OAuth Settings->Valid OAuth redirect URIs` add `http:/localhost:4000`. That's the default client address in this project.

Copy `/server/component-config.local.json.bak` to `/server/component-config.local.json` and add your facebook App Secret. Loopback applies *.local.json and *.local.js setting files after the default *.json or *.js. *.local.json and *.local.js are added to .gitignore as they **should not be publicly uploaded**.

Open `/client/src/authConfig.js` and add your public facebook clientId=App ID

#### Email verification
Email verification after signup is enabled in `server/model-config.json` ->  `"user": { "options": {"emailVerificationRequired": true}}`.

Currently included is gmail as email provider. Other options like sendMail are possible using Loopback components.

##### Gmail
For loopback to send mails vie gmail, you may (certainly) need to [“Allow Less Secure Apps”](https://www.google.com/settings/security/lesssecureapps) in your gmail account. You also may need to [“Allow access to your Google account”](https://accounts.google.com/DisplayUnlockCaptcha).

Copy `/server/datasources.local.json.bak` to `/server/datasources.local.json` and add gmail username and password.

### Optional:
Install loopback-component-explorer with `npm install loopback-component-explorer --save-dev` to use the loopback api explorer (recommended, free registration needed).

Use `npm install strongloop -g` for the [Strongloop](http://loopback.io/) suite (recommended).

## How to run the sample
In the root folder type:
```
npm start
```
This builds the aurelia-client and serves client and api. Open `http://localhost:3000` to sign up or use the provided user email:user@example.com / password:none

## What's in it
#### Sever
A [loopback](https://docs.strongloop.com/display/public/LB/LoopBack) api server with a user and a customer model with ACL.
```
user hasMany customers
customer belongsTo user
```
Unauthorized users only can list the customers. Authorized users additionally can manage their own customers. See the models in common/models.
Users can signup & login with verified emails or third-party providers (facebook). After signup with email, a verification emails is send. Users can also request an email to reset their password.

A local file is used as database. Have a peek at `mydata.json` to gain some insight.

By default loopback uses session token for authorization.

#### Client
An aurelia client app with authorized pages for user profile and customer management and unauthorized pages for login, signup and customer listing.

## Details
### Project structure
#### Server:
```
/server
/common
(/build)
(/doc)
```
##### server/server.js
The server entry point. The only interesting part is at the bottom. Here we are setting up a `/users/me ` path which is a shortcut for authorized users to `/users/:userid`.
```
app.use(loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me'
}));
```
##### server/model-config.json
The model declaration including which datasource they use. in this case we us `db` (see datasources.json). Here we declare our user and customer model, as well as the build-in models ACL, AccessToken, Role, RoleMapping which hold the Access control, authorization tokens and roles (eg `$owner`, `$authorized`) for our custom models.

##### server/datasources.json
Defines our datasources. In this case we have `db` to store our data which points to a local file (relative to the current working directory which is /client with the current start script). The `email` datasource configures your email server for transactional emails.

##### server/component-config.json
Sets up out components. `"model": "user"` adds the facebook methods to our account model `user`. In "fields" we'll tell facebook which data we want to retrieve. "uri" is the relative (to the model) path of the facebook methods. "mapping" maps the facebook data keys to the keys we use in our user model.
```
"loopback-component-satellizer": {
  "facebook": {
    "model": "user",
    "credentials": {
      "public": "your App ID",
      "private": "your App Secret"
    },
    "version": "v2.5",
    "fields": ["email","name","last_name","first_name","gender","birthday"],
    "uri": "/facebook",
    "mapping": {
      "id": "facebook",
      "email": "email",
      "first_name": "firstName",
      "last_name": "lastName",
      "name": "displayName",
      "gender": "gender",
      "birthday":"birthday"
    }
  }
}
```
##### server/email-config.json
Configurations for transactional emails.

##### common/models/customer.json
Here we define our `customer` model.
We use/inherit the build-in `PersistedModel`.
```
"base": "PersistedModel",
```
Define the `properties` of the `customer`
```
"properties": ..
```
Define the `relations` of the `customer`. Here `belongsTo` `user` identified by `userId`.
```
"relations": {
  "user": {
    "type": "belongsTo",
    "model": "user",
    "foreignKey": "userId",
    "options": {
      "validate": true,
      "forceId": false
    }
  }
},
```
Define the access to the rest api methods. First deny *=all, but READ for `$everyone`. Then allow create for `$authenticated` and *=all for `$owner` (of a customer entry)
```
"acls": [
  {
    "accessType": "*",
    "principalType": "ROLE",
    "principalId": "$everyone",
    "permission": "DENY"
  },
  {
    "accessType": "READ",
    "principalType": "ROLE",
    "principalId": "$everyone",
    "permission": "ALLOW"
  },
  {
    "accessType": "EXECUTE",
    "principalType": "ROLE",
    "principalId": "$authenticated",
    "permission": "ALLOW",
    "property": "create"
  },
  {
    "accessType": "*",
    "principalType": "ROLE",
    "principalId": "$owner",
    "permission": "ALLOW"
  }
],
```
##### common/models/customer.js
With setting "public" for customer in model-config.json the whole rest api gets exposed. Here we remove again all the default rest methods of `PersistedModel` we don't want.

##### common/models/user.json
Here we define our `user` model.
We use/inherit the build-in `User`. This gets us the expected properties and methods for user accounts (accessToken, ACL for eg. login, signup, update etc). Furthermore, in `/server/component-config.json` we set    `"model": "user"` for "loopback-component-satellizer"->"facebook". That adds the required remoteMethods to our user model which handle the facebook login on the server side.
```
"base": "User",
```
Define some additional `properties` of the `user`. Some we already inherited with the build-in User model, particularly the `email` property.
```
"properties": ..
```
Define the `relations` of the `user`. Here `hasMany` `customers` identified by `userId`.
```
"relations": {
  "customers": {
    "type": "hasMany",
    "model": "customer",
    "foreignKey": "userId",
    "options": {
      "validate": true,
      "forceId": false
    }
  }
},
```
Define the access to the rest api methods. With inheriting the build-in model `User` the common permission for accounts are already set. We need to allow the user access to their `costomers` though. For simplicity, we all just *=all crud for `$owner`. As that doesn't include remoteMethods we need to add ACl for those (I haven't checked out facebook-get yet. I'll just added it for future use.).
```
"acls": [
  {
    "accessType": "*",
    "principalType": "ROLE",
    "principalId": "$owner",
    "permission": "ALLOW"
  },
  {
    "accessType": "EXECUTE",
    "principalType": "ROLE",
    "principalId": "$owner",
    "permission": "ALLOW",
    "property": "set-password"
  },
  {
    "accessType": "EXECUTE",
    "principalType": "ROLE",
    "principalId": "$owner",
    "permission": "ALLOW",
    "property": "unlink"
  },
  {
    "accessType": "EXECUTE",
    "principalType": "ROLE",
    "principalId": "$everyone",
    "permission": "ALLOW",
    "property": "facebook"
  },
  {
    "accessType": "EXECUTE",
    "principalType": "ROLE",
    "principalId": "$unauthenticated",
    "permission": "ALLOW",
    "property": "facebook-get"
  }  
],
```
##### common/models/user.js
Adding hooks and additional remoteMethod for our user model.

We added the hook `User.afterRemote('create',..)` to send a verification email after signup. The email contains a link with a verification token to our api server which will redirect to our client if successful.

Loopback has User model has a build in reset password path. With User.on('resetPasswordRequest', ..) we react to the emitted resetPasswordRequest event to email a short-term token to the user for setting a new password.

The remoteMethod User.setPassword allows users to post their password.

The remoteMethod 'unlink' adds a third-party provider unlink route GET /:id/unlink/:provider which just deletes the providers userid from a user.

#### Client:
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
- Notifications/UI feedback
- Better scripts
- Email verification per pasting token
- Simple multiple endpoints using hopefully coming [spoonx/aurelia-api](https://github.com/SpoonX/aurelia-api) improvements
- Email templates