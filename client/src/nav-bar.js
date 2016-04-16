import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {User} from './modules/auth/user';
import {customElement, bindable} from 'aurelia-framework';

@customElement('nav-bar')

@inject(AuthService, User)
export class NavBar {
  @bindable router;

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
