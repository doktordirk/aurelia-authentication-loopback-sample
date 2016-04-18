import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {customElement, bindable} from 'aurelia-framework';

@customElement('nav-bar')

@inject(AuthService)
export class NavBar {
  @bindable router;

  constructor(auth) {
    this.auth = auth;
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
