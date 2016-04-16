import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class User {

  constructor(auth) {
    this.auth = auth;
    this.profile = null;
  }

  get() {
    return this.auth.getMe()
      .then(data => this.setProfileFromResponse(data));
  }

  update(profile) {
    return this.auth.updateMe(profile)
      .then(data => this.setProfileFromResponse(data));
  }

  setProfileFromResponse(data) {
    this.profile = data;

    return this.profile;
  }
}
