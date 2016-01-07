import {inject} from 'aurelia-framework';
import {CustomerData} from './customerData';
import {Router} from 'aurelia-router';
import {Notify} from 'modules/notify';

@inject(CustomerData, Router, Notify)
export class Edit {

  constructor(data, router, notify) {
    this.data = data;
    this.router = router;
    this.notify = notify;
  }

  cancel() {
    return this._loadCustomer(this.customer.id);
  }

  goBack() {
    window.history.back();
  }

  activate(params) {
    this.original = {};
    this.customer = {};

    if (params.id) {
      return this._loadCustomer(params.id);
    }
  }

  _loadCustomer(id) {
    return this.data.getById(id)
        .then(customer => {
          this.original = JSON.parse(JSON.stringify(customer));
          this.customer = customer;
          return this.customer;
        })
      .catch(error=>{
        this.notify.error(error);
        this.goBack();
      });
  }

  delete() {
    this.data.delete(this.customer)
      .then(()=>{
        this.router.navigate('list');
      })
      .catch(error=>{
        this.notify.error(error);
      });
  }

  get isUnchanged() {
    return this.areEqual(this.customer, this.original);
  }

  save() {
    this.data.save(this.customer)
      .then(customer => {
        this.original = JSON.parse(JSON.stringify(customer));
        this.router.navigate('list');
      })
      .catch(error=>{
        this.notify.error(error);
      });
  }

  areEqual(obj1, obj2) {
    return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
  }
}
