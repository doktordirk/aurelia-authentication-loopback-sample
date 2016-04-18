import { inject } from 'aurelia-framework';
import { Endpoint} from 'aurelia-api';

@inject(Endpoint.of('api'))  // the 'api' endpoint with Authorization header
export class Customers {

  model = 'customers';

  constructor(rest) {
    this.apiEndpoint = rest;
  }

  getById(id) {
    return this.apiEndpoint.find(this.model, id);
  }

  getAll(criteria) {
    return this.apiEndpoint.find(this.model, criteria);
  }

  delete(customer) {
    return this.apiEndpoint.destroy(this.model, customer.id);
  }

  save(customer) {
    let request;

    if (customer.id) {
      request = this.apiEndpoint.update(this.model, customer.id, customer);
    } else {
      request = this.apiEndpoint.create(this.model, customer);
    }

    return request;
  }
}
