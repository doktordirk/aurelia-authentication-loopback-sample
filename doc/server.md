# Aurelia-auth-loopback-sample

## Loopback server
```
/server
/common
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

##### server/boot/create-admin.js
In server/boot/ are the loopback boot scripts. create-admin.js add the Role `admin` and creates a user with that role.

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
Define the `relations` of the `user`. Here `hasMany` `customers` identified by `userId` and `hasMany` `Roles` through `RoleMapping` identified by `principalId=userId`.
```
"relations": {
  "Roles": {
    "type": "hasMany",
    "model": "Role",
    "through": "RoleMapping",
    "foreignKey": "principalId"
  },
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
Define the access to the rest api methods. With inheriting the build-in model `User` the common permission for accounts are already set. We need to allow the user access to their `customers` though. We allow access to related models with `__methodName__relatedModelNamePlural` (https://docs.strongloop.com/display/public/LB/Accessing+related+models). As that doesn't include remoteMethods we need to add ACl for those (I haven't checked out facebook-get yet. I'll just added it for future use.). Finally, we allow the admin everything.
```
"acls": [
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
    {
     "principalType": "ROLE",
     "principalId": "$everyone",
     "permission": "ALLOW",
     "property": "__count__customers"
    },
    {
     "principalType": "ROLE",
     "principalId": "$authenticated",
     "permission": "ALLOW",
     "property": "__create__customers"
    },
    {
     "principalType": "ROLE",
     "principalId": "$owner",
     "permission": "ALLOW",
     "property": "__delete__customers"
    },
    ...
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "admin",
      "permission": "ALLOW",
      "property": "*"
    }
],
```
##### common/models/user.js
Adding hooks and additional remoteMethod for our user model.

We added the hook `User.afterRemote('create',..)` to send a verification email after signup. The email contains a link with a verification token to our api server which will redirect to our client if successful.

Loopback has User model has a build in reset password path. With User.on('resetPasswordRequest', ..) we react to the emitted resetPasswordRequest event to email a short-term token to the user for setting a new password.

The remoteMethod User.setPassword allows users to post their password.

The remoteMethod 'unlink' adds a third-party provider unlink route GET /:id/unlink/:provider which just deletes the providers userid from a user.
