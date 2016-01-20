import {inject} from 'aurelia-framework';
import {Endpoint} from 'spoonx/aurelia-api';

@inject(Endpoint.of())
export class Customers {
  heading = 'Customers';
  customers = [];

  model = 'customers';

  constructor(rest) {
    this.rest = rest;
  }

  activate() {
    return this.rest.find(this.model)
      .then(customers => this.customers = customers);
  }
}
