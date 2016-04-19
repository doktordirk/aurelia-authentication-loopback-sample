import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Logout {
  constructor(auth) {
    this.auth = auth;
    this.client = auth.client;
  }

  activate() {
    /* for JWT:
    *  since its stateless, we only need to delete the token in the browsers storage

    this.auth.logout();

    */

    // for default loopback:
    // since it uses sessionToken, we need to logout on the server
    this.client.post('logout')
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
