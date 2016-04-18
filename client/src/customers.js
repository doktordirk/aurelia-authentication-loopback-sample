import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())  //default endpoint (was set to 'public')
export class Customers {
  heading = 'Customers';
  customers = [];

  constructor(rest) {
    this.publicApi = rest;
  }

  activate() {
    return this.publicApi.find('customers',{filter: '{"include": "user"}'})
      .then(customers => this.customers = customers);
  }
}
