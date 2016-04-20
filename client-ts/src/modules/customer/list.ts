import { autoinject } from 'aurelia-framework';
import { Customers } from './customers';
import { Router } from 'aurelia-router';

@autoinject()
export class List {
  heading = 'Customer management';

  customerList = [];

  customers: Customers;
  router: Router;

  constructor(customers: Customers, router: Router) {
    this.customers = customers;
    this.router = router;
  }

  gotoCustomer(customer: any) {
    this.router.navigateToRoute('edit', {id: customer.id});
  }

  new() {
    this.router.navigateToRoute('create');
  }

  activate() {
    return this.customers.getAll()
      .then(customerList => this.customerList = customerList);
  }
}
