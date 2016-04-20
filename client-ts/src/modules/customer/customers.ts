import { inject } from 'aurelia-framework';
import { Endpoint, Rest} from 'aurelia-api';

@inject(Endpoint.of('api'))  // the 'api' endpoint
export class Customers {

  model = 'customers';
  apiEndpoint: Rest;

  constructor(rest: Rest) {
    this.apiEndpoint = rest;
  }

  getById(id: number) {
    return this.apiEndpoint.find(this.model, id);
  }

  getAll(criteria?: Object) {
    return this.apiEndpoint.find(this.model, criteria);
  }

  delete(customer: any) {
    return this.apiEndpoint.destroy(this.model, customer.id);
  }

  save(customer: any) {
    let request;

    if (customer.id) {
      request = this.apiEndpoint.update(this.model, customer.id, customer);
    } else {
      request = this.apiEndpoint.create(this.model, customer);
    }

    return request;
  }
}
