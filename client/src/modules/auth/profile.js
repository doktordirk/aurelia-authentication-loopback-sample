import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';

@inject(AuthService)
export class Profile {
 heading = 'Profile';

 displayName = '';
 email  = '';
 password    = '';

 constructor(auth) {
   this.auth = auth;
   this.profile = null;
 }

 activate() {
   return this.auth.getMe()
  .then(data => this.profile = data);
 }

 update() {
   return this.auth.updateMe(this.profile);
 }
/*
 link(provider) {
   return this.auth.authenticate(provider, true, null)
  .then(response => this.auth.getMe())
  .then(data => this.profile = data)
  .catch(err => console.error('link error', err));
 }

 unlink(provider) {
   return this.auth.unlink(provider)
  .then(() => this.auth.getMe())
  .then(data => this.profile = data);
 }
*/
}
