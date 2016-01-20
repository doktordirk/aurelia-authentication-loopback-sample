import {inject} from 'aurelia-framework';
import {Endpoint} from 'spoonx/aurelia-api';

@inject(Endpoint.of('auth'))
export class UserData {

  model = 'users';

  constructor(rest) {
    this.rest = rest;
  }

  get modelPath() {
    return `${this.model}`;
  }

  getById(id) {
    return this.rest.find(this.modelPath, id);
  }

  getAll() {
    return this.rest.find(this.modelPath);
  }

  delete(user) {
    return this.rest.destroy(this.modelPath, user.id);
  }

  save(user) {
    let request;

    if (user.id) {
      request = this.rest.update(this.modelPath, user.id, user);
    } else {
      request = this.rest.create(this.modelPath, user);
    }

    return request;
  }
}
