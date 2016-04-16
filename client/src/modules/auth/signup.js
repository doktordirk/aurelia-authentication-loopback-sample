import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Signup {
  constructor(auth) {
    this.auth = auth;
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
    });
  }
}
