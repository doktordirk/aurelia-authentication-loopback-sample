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

 // login per email+password
 login() {
   return this.auth.login(this.email, this.password);
 }

 // login with third-party authentication
 authenticate(name) {
   return this.auth.authenticate(name);
 }
}
