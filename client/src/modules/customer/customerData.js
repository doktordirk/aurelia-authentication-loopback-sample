import {inject} from 'aurelia-framework';
import {Rest} from 'spoonx/aurelia-api';

@inject(Rest)
export class CustomerData {

  model = 'users/me/customers';

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

  delete(customer) {
    return this.rest.destroy(this.modelPath, customer.id);
  }

  save(customer) {
    let request;

    if (customer.id) {
      request = this.rest.update(this.modelPath, customer.id, customer);
    } else {
      request = this.rest.create(this.modelPath, customer);
    }

    return request;
  }
}
