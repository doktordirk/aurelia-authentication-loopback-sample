import { inject } from 'aurelia-framework';
import { Customers } from './customers';
import { Router } from 'aurelia-router';

@inject(Customers, Router)
export class Edit {

  constructor(customers, router) {
    this.customers = customers;
    this.router = router;
  }

  cancel() {
    return this.customer = JSON.parse(this.original);
  }

  goBack() {
    window.history.back();
  }

  activate(params) {
    this.customer = null;
    this.original = 'null';

    if (params.id) {
      return this.customers.getById(params.id)
        .then(customer => {
          this.original = JSON.stringify(customer);
          this.customer = customer;
        });
    }
  }

  delete() {
    this.customers.delete(this.customer)
      .then(() => this.router.navigate('list'));
  }

  get isUnchanged() {
    return JSON.stringify(this.customer) === this.original;
  }

  save() {
    this.customers.save(this.customer)
      .then(customer => {
        this.original = JSON.stringify(customer);
        this.router.navigate('list');
      });
  }
}
