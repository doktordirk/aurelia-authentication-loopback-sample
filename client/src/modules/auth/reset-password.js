import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {AuthService} from'spoonx/aurelia-auth';
import {Router} from 'aurelia-router';

@inject(HttpClient, AuthService, Router)
export class ResetPassword {
  resetPath = 'users/me/set-password'
  heading = 'Password reset'
  password = ''
  params = {}

  constructor(http, auth, router) {
    this.http = http;
    this.auth = auth;
    this.router = router;
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
    .catch(response => {
      response.json().then(err=>{
        console.error('Request failure', err);
      });
    });
  }
}
