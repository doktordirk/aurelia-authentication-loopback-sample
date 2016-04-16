import { inject } from 'aurelia-framework';
import { CustomerData } from './customerData';
import { Router } from 'aurelia-router';

@inject(CustomerData, Router)
export class Edit {

  constructor(data, router) {
    this.data = data;
    this.router = router;
  }

  cancel() {
    return this.customer = JSON.parse(this.original);
  }

  goBack() {
    window.history.back();
  }

  activate(params) {
    this.original = '{}';
    this.customer = {};

    if (params.id) {
      return this.data.getById(params.id)
      .then(customer => {
        this.original = JSON.stringify(customer);
        return (this.customer = customer);
      });
    }
  }

  delete() {
    this.data.delete(this.customer)
      .then(() => {
        this.router.navigate('list');
      });
  }

  get isUnchanged() {
    return JSON.stringify(this.customer) === this.original;
  }

  save() {
    this.data.save(this.customer)
      .then(customer => {
        this.original = JSON.stringify(customer);
        this.router.navigate('list');
      });
  }
}
