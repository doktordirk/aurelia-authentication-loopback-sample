import {User} from './user';
import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-authentication';
import {Notify} from 'modules/notify';

@inject(User, AuthService, Notify)
export class Profile {
  heading = 'Profile';

  constructor(user, auth, notify) {
    this.user = user;
    this.auth = auth;
    this.notify = notify;
    this.profile = null;
  }

  activate() {
    return this.user.get()
      .then(data => this.profile = data)
      .catch(error => {
        this.notify.error(error);
        window.history.back();
      });
  }

  update() {
    return this.user.update(this.profile)
      .then(data => {
        this.profile = data;
        this.notify.success('Updated');
      })
      .catch(error => this.notify.error(error));
  }

  link(provider) {
    return this.auth.authenticate(provider, true, null)
      .then(response => this.user.get())
      .then(data => this.profile = data)
      .catch(error => console.error(error));
  }

  unlink(provider) {
    return this.auth.unlink(provider)
      .then(() => this.user.get())
      .then(data => this.profile = data)
      .catch(error => this.notify.error(error));
  }
}
