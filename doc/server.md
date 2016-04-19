# aurelia-authentication-loopback-sample

## Loopback server

```sh
/server
/common
```

### server/server.js

The server entry point. The only interesting part is at the bottom. Here we are setting up a `/users/me ` path which is a shortcut for authorized users to `/users/:userid`.

```js
app.use(loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me'
}));
```

### server/model-config.json

The model declaration including which datasource they use. in this case we us `db` (see datasources.json). Here we declare our user and customer model, as well as the build-in models ACL, AccessToken, Role, RoleMapping which hold the Access control, authorization tokens and roles (eg `$owner`, `$authorized`) for our custom models.

### server/datasources.json

Defines our datasources. In this case we have `db` to store our data which points to a local file (relative to the current working directory which is /client with the current start script).

### server/component-config.json

Sets up out components. `"model": "user"` adds the facebook methods to our account model `user`. In "fields" we'll tell facebook which data we want to retrieve. "uri" is the relative (to the model) path of the facebook methods. "mapping" maps the facebook data keys to the keys we use in our user model.

```json
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

### common/models/customer.json

Here we define our `customer` model. We use/inherit the build-in `PersistedModel`.

```json
"base": "PersistedModel",
```

Define the `properties` of the `customer`

```json
"properties": ..
```

Define the `relations` of the `customer`. Here `belongsTo` the `user` identified by `userId`.

```json
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

Define the access to the rest api methods. First deny * = all, but READ for `$everyone`. Then allow create for `$authenticated` and * = all for `$authenticated` (of a customer entry)

```json
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
    "principalId": "$authenticated",
    "permission": "ALLOW"
  }
]
```

### common/models/customer.js

With setting "public" for customer in model-config.json the whole rest api gets exposed. Here we remove again all the default rest methods of `PersistedModel` we don't want and only keep GET request open for the public.

### common/models/user.json

Here we define our `user` model.
We use/inherit the build-in `User`. This gets us the expected properties and methods for user accounts (accessToken, ACL for eg. login, signup, update etc). Furthermore, in `/server/component-config.json` we set    `"model": "user"` for "loopback-component-satellizer"->"facebook". That adds the required remoteMethods to our user model which handle the facebook login on the server side.

```json
"base": "User",
```

Define some additional `properties` of the `user`. Some we already inherited with the build-in User model, particularly the `email` property.

```json
"properties": ..
```

Define the `relations` of the `user`. Here `hasMany` of `customers` identified by `userId` and `hasMany`.

```json
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

Define the access to the rest api methods. With inheriting the build-in model `User` the common permission for accounts are already set. We need to allow the user access to their `customers` though. We allow access to related models with `__methodName__relatedModelNamePlural` [see related models](https://docs.strongloop.com/display/public/LB/Accessing+related+models). As that doesn't include remoteMethods we need to add ACl for those (I haven't checked out facebook-get yet. I'll just added it for future use.).

```json
"acls": [
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
    }
]
```

### common/models/user.js

Adding hooks and additional remoteMethod for our user model.

The remoteMethod 'unlink' adds a third-party provider unlink route GET /:id/unlink/:provider which just deletes the providers userid from a user.
