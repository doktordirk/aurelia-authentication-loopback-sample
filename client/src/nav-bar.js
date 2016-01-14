import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';
import {User} from './modules/auth/user';

@inject(AuthService, User)
export class NavBar {

  constructor(auth, user) {
    this.auth = auth;
    this.user = user;
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  get isAdmin() {
    return this.user.isAdmin();
  }
}
