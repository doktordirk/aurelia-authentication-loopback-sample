import {User} from './user';
import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Endpoint} from 'aurelia-api';

@inject(User, AuthService, Endpoint.of('auth'))
export class Logout {
  constructor(user, auth, rest) {
    this.user = user;
    this.auth = auth;
    this.rest = rest;
  }

  activate() {
    // post logout to loopback server. deletes token on server
    this.rest.post('users/logout')
    .then(() => {
      // delete local token and redirect in any case
      this.auth.logout();
    })
    .catch(() => {
      // same on error. browser storage must be clean
      this.auth.logout();
    })
  }
}
