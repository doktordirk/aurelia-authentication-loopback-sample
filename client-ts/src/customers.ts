import {inject} from 'aurelia-framework';
import {Endpoint, Rest} from 'aurelia-api';

@inject(Endpoint.of('public'))  //default endpoint (was set to 'public')
export class Customers {
  heading = 'Customers';
  customers = [];
  publicApi: Rest;

  constructor(rest: Rest) {
    this.publicApi = rest;
  }

  activate() {
    return this.publicApi.find('customers',{filter: '{"include": "user"}'})
      .then(customers => this.customers = customers);
  }
}
