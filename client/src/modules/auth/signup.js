import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';

@inject(AuthService)
export class Signup {
 constructor(auth) {
   this.auth = auth;
 }
 heading = 'Sign Up';

 email=''
 password=''
 displayName=''

 signup() {
   return this.auth.signup({
     displayName: this.displayName,
     email: this.email,
     password: this.password
   })
   .then( response => {
     console.log('signed up', response);
   })
   .catch( response => {
     console.error('signed up error', response);
   });
 }
}
