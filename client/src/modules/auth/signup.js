import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-authentication';
import {Notify} from 'modules/notify';

@inject(AuthService, Notify)
export class Signup {
  constructor(auth, notify) {
    this.auth = auth;
    this.notify = notify;
  }

  heading = 'Sign Up';

  email = '';
  password = '';
  displayName = '';

  signup() {
    return this.auth.signup({
      displayName: this.displayName,
      email: this.email,
      password: this.password
    })
    .catch(error => this.notify.error(error));
  }
}
