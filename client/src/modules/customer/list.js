import {inject} from 'aurelia-framework';
import {CustomerData} from './customerData';
import {Router} from 'aurelia-router';
import {Notify} from 'modules/notify';

@inject(CustomerData, Router, Notify)
export class List {
  heading = 'Customer management';

  customers = [];

  constructor(data, router, notify) {
    this.data = data;
    this.router = router;
    this.notify = notify;
  }

  gotoCustomer(customer) {
    this.router.navigateToRoute('edit', { id: customer.id });
  }

  new() {
    this.router.navigateToRoute('create');
  }

  getData() {
    //implement spinner

    return this.data.getAll()
      .then(customers => this.customers = customers);
  }

  activate() {
    return this.getData()
      .catch(error => this.notify.error(error));
  }
}
