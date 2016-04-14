import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import {Router} from 'aurelia-router';
import {Notify} from 'modules/notify';

@inject(Endpoint.of('auth'), Router, Notify)
export class RequestPasswordReset {
  requestPath = 'users/reset'
  heading = 'Passord reset request';
  email = ''

  constructor(rest, router, notify) {
    this.rest = rest;
    this.router = router;
    this.notify = notify;
  }

  request() {
    let request = this.rest.post(this.requestPath, {email: this.email})
    .then( () => {
      this.router.navigate('confirm');
    })
   .catch(error => this.notify.error(error));
    return request;
  }
}
