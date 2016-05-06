# aurelia-authentication-loopback-sample

[![Join the chat at https://gitter.im/SpoonX/Dev](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SpoonX/Dev?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**Aurelia client included as [ES6-SystemJs](/client), [ES6-Webpack](/client-wp) and [Typescript-SystemJs](/client-ts) versions**

This is a skeleton for an [Aurelia](http://aurelia.io/) client using [aurelia-authentication](https://github.com/SpoonX/aurelia-authentication) for authorized access to a [Strongloop](http://loopback.io/) loopback api server.

[Loopback-component-satellizer](https://www.npmjs.com/package/loopback-component-satellizer) is used to handle third-party authentication on the server side.

The aurelia-authentication documentantion you'll find at [aurelia-authentication.spoonx.org](http://aurelia-authentication.spoonx.org/).

## Installation instructions

### For ES6-SystemJs and Typescript-SystemJs

For typescript, replace `cd client` below with `cd client-ts`.

```sh
git clone https://github.com/dirkeisinger/aurelia-authentication-loopback-sample
cd aurelia-authentication-loopback-sample
npm install
cd client
npm install
jspm install
```

To run the sample type in the client folder:

```sh
gulp watch
```

This builds the aurelia-client and serves the client and the api server. Browse to `localhost:9000` to see it in action. Sign up or use the provided user email: `user@example.com` / password: `none

### For ES6-Webpack

```sh
git clone https://github.com/dirkeisinger/aurelia-authentication-loopback-sample
cd aurelia-authentication-loopback-sample
npm install
cd client-wp
npm install
```

To run the sample open two shells:

- run server in one console from the root folder with: `node .`
- run client in the second console from the client-wp folder with: `npm run dev`

Browse to `localhost:9000` to see it in action. Sign up or use the provided user email: `user@example.com` / password: `none`.

### Configuration

#### Third-party login

Included are configuration options for facebook and google+ using [loopback-component-satellizer](https://www.npmjs.com/package/loopback-component-satellizer)

##### Facebook

You'll need a facebook developer account (developers.facebook.com). Add a new website app (skip quick start).
You'll find your facebook app credentials in `Settings->Basic`: App ID (which is public) and App Secret (which is private, so don't upload that one on github or alike). Set the website url there to eg `http:/localhost`. In `Settings->Advanced` in `Client OAuth Settings->Valid OAuth redirect URIs` add `http:/localhost:9000`. That's the default client address in this project.

Copy `/server/component-config.local.json.bak` to `/server/component-config.local.json` and add your facebook App Secret. Loopback applies *.local.json and *.local.js setting files after the default *.json or *.js. *.local.json and *.local.js are added to .gitignore as they **should not be publicly uploaded**.

Open `/client/src/authConfig.js` and add your public facebook clientId=App ID

## What's in it

### Loopback server

#### [/server](/server)

A [loopback](https://docs.strongloop.com/display/public/LB/LoopBack) api server. A local file is used as database. Have a peek at [mydata.json](mydata.json) to gain some insight. Session tokens are used for authorization (loopback default).

#### [/common](/common)

The user model with with ACL and the related customer model.

- user hasMany customers
- customer belongsTo user

Unauthorized users only can list the customers. Authorized users can add and manage their own customers. See the models in common/models.
Users can signup & login with emails or third-party providers (facebook).

### Aurelia client

#### [/client](/client) [/client-ts](/client-ts)  [/client-wp](/client-wp)

An aurelia client app with authorized pages for user profile and customer management and unauthorized pages for login, signup and customer listing.

## Details

More information about the loopback server and the aurelia client code are in the [./doc](./doc) folder.

## Support

- Aurelia Gitter chat [![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
- Spoonx/Dev Gitter Chat for aurelia-api/-auth/-notifications [![Join the chat at https://gitter.im/SpoonX/Dev](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SpoonX/Dev?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
- Loopback Gitter Chat [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/strongloop/loopback?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
