import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())  //default endpoint (was et to 'public')
export class Customers {
  heading = 'Customers';
  customers = [];

  constructor(rest) {
    this.publicApi = rest;
  }

  activate() {
    return this.publicApi.find('customers')
      .then(customers => this.customers = customers);
  }
}
