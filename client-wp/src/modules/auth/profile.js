import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(AuthService)
export class Profile {
  heading = 'Profile';

  constructor(auth) {
    this.auth = auth;
    this.profile = null;
  }

  // needs arrow to keep context
  setProfile = data => {
    this.profile = data;
  }

  activate() {
    return this.auth.getMe()
      .then(this.setProfile);
  }

  update() {
    return this.auth.updateMe(this.profile)
      .then(this.setProfile);
  }

  link(provider) {
    return this.auth.authenticate(provider, 0)   // 0=don't redirect
      .then(() => this.auth.getMe())             // update profile afterwards
      .then(this.setProfile)
  }

  unlink(provider) {
    return this.auth.unlink(provider)
      .then(() => this.auth.getMe())             // update profile afterwards
      .then(this.setProfile)
  }
}
