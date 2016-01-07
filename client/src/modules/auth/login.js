import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';

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
   return this.auth.login({
     email: this.email,
     password: this.password
   })
    .catch(error => console.error(error));
 }

 authenticate(name) {
   return this.auth.authenticate(name, false, null)
    .catch(error => console.error(error));
 }
}
