import {inject} from 'aurelia-framework';
import {AuthService} from 'spoonx/aurelia-auth';

@inject(AuthService)
export class User {

  constructor(auth) {
    this.auth = auth;
    this.profile = null;
    let tokenName = 'roles';
    this.tokenName = this.auth.auth.config.tokenPrefix ? this.auth.auth.config.tokenPrefix + '_' + tokenName : tokenName;
  }

  get() {
    return this.auth.getMe({filter: '{"include": "Roles"}'})
      .then(data => this.setProfileFromResponse(data));
  }

  update(profile) {
    return this.auth.updateMe(profile)
      .then(data => this.setProfileFromResponse(data));
  }

  setProfileFromResponse(data) {
    this.profile = data;

    let roles = data.Roles ? data.Roles.map(role => role.name) : [];
    this.auth.auth.storage.set(this.tokenName, roles);

    return this.profile;
  }

  removeRoles() {
    this.auth.auth.storage.remove(this.tokenName);
  }

  getRoles() {
    let roles = this.auth.auth.storage.get(this.tokenName) || '';
    return roles.split(',');
  }

  isAdmin() {
    return this.getRoles().indexOf('admin') !== -1;
  }
}
