import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';
import {Rest} from 'spoonx/aurelia-api';

@inject(AuthService, Rest)
export class Logout {
  constructor(authService, rest) {
    this.authService = authService;
    this.rest = rest;
  }

  activate() {
    // post logout to loopback server. deletes token on server
    this.rest.post('users/logout').then(response=>{
      console.log('ok logged out', response);
    })
    .catch(err=>{
      console.error('error logged out', err);
    })
    .then(()=>{
      // delete local token and redirect in any case
      this.authService.logout('#/login');
    });
  }
}
