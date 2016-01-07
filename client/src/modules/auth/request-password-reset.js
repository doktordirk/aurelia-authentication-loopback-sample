import {inject} from 'aurelia-framework';
import {Rest} from 'spoonx/aurelia-api';
import {Router} from 'aurelia-router';

@inject(Rest, Router)
export class RequestPasswordReset {
  requestPath = 'users/reset'
  heading = 'Passord reset request';
  email = ''

  constructor(rest, router) {
    this.rest = rest;
    this.router = router;
  }

  request() {
    let request = this.rest.post(this.requestPath, {email: this.email})
    .then( () => {
      this.router.navigate('confirm');
    })
    .catch(response => {
      response.json().then(err=>{
        console.error('Request failure', err);
      });
    });
    return request;
  }
}
