import {inject} from 'aurelia-framework';
import {UserData} from './userData';
import {Router} from 'aurelia-router';
import {Notify} from 'modules/notify';

@inject(UserData, Router, Notify)
export class Edit {

  constructor(data, router, notify) {
    this.data = data;
    this.router = router;
    this.notify = notify;
  }

  cancel() {
    return this._loadUser(this.user.id);
  }

  goBack() {
    window.history.back();
  }

  activate(params) {
    this.original = {};
    this.user = {};

    if (params.id) {
      return this._loadUser(params.id);
    }
  }

  _loadUser(id) {
    return this.data.getById(id)
        .then(user => {
          this.original = JSON.parse(JSON.stringify(user));
          this.user = user;
          return this.user;
        })
      .catch(error=>{
        this.notify.error(error);
        this.goBack();
      });
  }

  delete() {
    this.data.delete(this.user)
      .then(()=>{
        this.router.navigate('list');
      })
      .catch(error=>{
        this.notify.error(error);
      });
  }

  get isUnchanged() {
    return this.areEqual(this.user, this.original);
  }

  save() {
    this.data.save(this.user)
      .then(user => {
        this.original = JSON.parse(JSON.stringify(user));
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
