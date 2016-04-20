import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {customElement, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router'

@customElement('nav-bar')

@inject(AuthService)
export class NavBar {
  @bindable router: Router;
  auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
