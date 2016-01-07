import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';
import {Notify} from 'modules/notify';

@inject(AuthService, Notify)
export class Profile {
  heading = 'Profile';

  displayName = '';
  email = '';
  password = '';

  constructor(auth, notify) {
    this.auth = auth;
    this.notify = notify;
    this.profile = null;
  }

  activate() {
    return this.auth.getMe()
      .then(data => this.profile = data)
      .catch(error => this.notify.error(error));
  }

  update() {
    return this.auth.updateMe(this.profile)
      .then(response=>this.notify.success('Updated'))
      .catch(error => this.notify.error(error));
  }

  link(provider) {
    return this.auth.authenticate(provider, true, null)
      .then(response => this.auth.getMe())
      .then(data => this.profile = data)
      .catch(error => console.error(error));
  }

  unlink(provider) {
    return this.auth.unlink(provider)
      .then(() => this.auth.getMe())
      .then(data => this.profile = data)
      .catch(error => this.notify.error(error));
  }
}
