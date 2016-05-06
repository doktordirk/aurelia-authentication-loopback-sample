import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Logout {
  constructor(auth) {
    this.auth = auth;
  }

  activate() {
    // since its stateless, we only need to delete the token in the browsers storage
    this.auth.logout();
  }
}
