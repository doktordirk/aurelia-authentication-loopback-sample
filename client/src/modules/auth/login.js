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
  .then(response => {
    console.log('success logged', response);
  })
  .catch(response => {
    console.error('login failure', response);
  });
 }

 authenticate(name) {
   return this.auth.authenticate(name, false, null)
  .then(response => {
    console.log('success authenticate', response);
  })
  .catch(response => {
    console.error('authenticate failure', response);
  });
 }
}
