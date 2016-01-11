import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';
import {Notify} from 'modules/notify';

@inject(AuthService, Notify)
export class Login {
 constructor(auth, notify) {
   this.auth = auth;
   this.notify = notify;
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
   .catch(error=>this.notify.error(error));
 }

 authenticate(name) {
   return this.auth.authenticate(name, false, null)
     .catch(error=>console.error(error));
 }
}
