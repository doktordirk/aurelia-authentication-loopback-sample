import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {AuthService} from'spoonx/aurelia-auth';
import {Router} from 'aurelia-router';
import {Notify} from 'modules/notify';

@inject(HttpClient, AuthService, Router, Notify)
export class ResetPassword {
  resetPath = 'users/me/set-password'
  heading = 'Password reset'
  password = ''
  params = {}

  constructor(http, auth, router, notify) {
    this.http = http;
    this.auth = auth;
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

    return this.http.fetch(this.resetPath, {
      headers: { 'authorization': this.params.access_token },
      method: 'post',
      body: json(content)
    })
    .then( () => {
      this.router.navigate('login');
    })
   .catch(error => this.notify.error(error));
  }
}
