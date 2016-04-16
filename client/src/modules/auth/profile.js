import {User} from './user';
import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

@inject(User, AuthService)
export class Profile {
  heading = 'Profile';

  constructor(user, auth, notify) {
    this.user = user;
    this.auth = auth;
    this.profile = null;
  }

  activate() {
    return this.user.get()
      .then(data => this.profile = data)
      .catch(error => {
        window.history.back();
      });
  }

  update() {
    return this.user.update(this.profile)
      .then(data => {
        this.profile = data;
      })
  }

  link(provider) {
    return this.auth.authenticate(provider, true, null)
      .then(response => this.user.get())
      .then(data => this.profile = data)
  }

  unlink(provider) {
    return this.auth.unlink(provider)
      .then(() => this.user.get())
      .then(data => this.profile = data)
  }
}
