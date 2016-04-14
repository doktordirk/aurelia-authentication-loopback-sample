import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-authentication';
import {Notify} from 'modules/notify';

@inject(AuthService, Notify)
export class Login {
 constructor(auth, notify) {
   this.auth = auth;
   this.notify = notify;
   this.auth.authentication.getLoginRoute();
  }

 heading  = 'Login';

 email    = '';
 password = '';

 login() {
   // login per email
   return this.auth.login(this.email, this.password)
     .catch(error=>this.notify.error(error));
 }

 authenticate(name) {
   return this.auth.authenticate(name)
     .catch(error=>console.error(error));
 }
}
