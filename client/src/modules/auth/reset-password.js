import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import {Router} from 'aurelia-router';
import {Notify} from 'modules/notify';

@inject(Endpoint.of('auth'), Router, Notify)
export class ResetPassword {
  resetPath = 'users/me/set-password';
  heading = 'Password reset';
  password = '';
  params = {};

  constructor(rest, router, notify) {
    this.rest = rest;
    this.router = router;
    this.notify = notify;
  }

  activate(params) {
    // should contain the short term access token as 'access_token'
    this.params = params;
  }

  reset() {
    let content = {
      password: this.password,
      confirmation: this.password
    };
    let options = {
      headers: { 'authorization': this.params.access_token }
    };

    return this.rest.post(this.resetPath, content, options)
      .then( () => {
        this.router.navigate('login');
      })
     .catch(error => this.notify.error(error));
  }
}
