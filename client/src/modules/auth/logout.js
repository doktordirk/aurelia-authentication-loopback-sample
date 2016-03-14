import {User} from './user';
import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';
import {Endpoint} from 'spoonx/aurelia-api';
import {Notify} from 'modules/notify';

@inject(User, AuthService, Endpoint.of('auth'), Notify)
export class Logout {
  constructor(user, auth, rest, notify) {
    this.user = user;
    this.auth = auth;
    this.rest = rest;
    this.notify = notify;
  }

  activate() {
    // post logout to loopback server. deletes token on server
    this.rest.post('users/logout')
    .catch(error => this.notify.error(error))
    .then(() => {
      // delete local token and redirect in any case
      this.user.removeRoles();
      this.auth.logout();
    });
  }
}
