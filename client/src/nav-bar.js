import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';

@inject(AuthService)
export class NavBar {

  constructor(auth ) {
    this.auth = auth;
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
