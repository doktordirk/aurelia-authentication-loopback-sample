# Aurelia-auth-loopback-sample

This is a basic sample for an [aurelia](http://aurelia.io/) client using [spoonx/aurelia-auth](https://github.com/SpoonX/aurelia-auth) for authorized access to a [Strongloop](http://loopback.io/) loopback api server based on paul van bladel's [aurelia-loopback-sample](https://github.com/paulvanbladel/aurelia-loopback-sample/) and [aurelia-auth-sample](https://github.com/paulvanbladel/aurelia-auth-sample/)
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

##How to run the sample
In the root folder type:
```
npm start
```
This builds the aurelia-client and serves client and api. Then open `http://localhost:3000` and sign up or use the provided user email:user@example.com / password:none

##What's in it

The [loopback](https://docs.strongloop.com/display/public/LB/LoopBack) api server has a user and a customer model with ACL.
```
user hasMany customers
customer belongsTo user
```
Unauthorized users only can list the customers. Authorized users additionally can manage their own customers. See the models in common/models.

By default loopback uses a session token for authorization. This basic version does not use third-party authorization.

A local file is used as database. Have a peek at `mydata.json` to gain some insight.

Install loopback-component-explorer with `npm install loopback-component-explorer --save-dev` to use the loopback api explorer (free registration needed).

Use `npm install strongloop -g` for the [Strongloop](http://loopback.io/) suite 
