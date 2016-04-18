import { inject } from 'aurelia-framework';
import { Customers } from './customers';
import { Router } from 'aurelia-router';

@inject(Customers, Router)
export class List {
  heading = 'Customer management';

  customers = [];

  constructor(customer, router) {
    this.customer = customer;
    this.router = router;
  }

  gotoCustomer(customer) {
    this.router.navigateToRoute('edit', {id: customer.id});
  }

  new() {
    this.router.navigateToRoute('create');
  }

  activate() {
    return this.customer.getAll()
      .then(customers => this.customers = customers);
  }
}
