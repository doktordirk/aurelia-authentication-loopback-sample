import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Login {
 constructor(auth) {
   this.auth = auth;
  }

 heading  = 'Login';

 email    = '';
 password = '';

 login() {
   // login per email
   return this.auth.login(this.email, this.password);
 }

 authenticate(name) {
   return this.auth.authenticate(name);
 }
}
