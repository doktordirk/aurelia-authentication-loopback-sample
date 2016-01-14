import {inject} from 'aurelia-framework';
import {UserData} from './userData';
import {Router} from 'aurelia-router';
import {Notify} from 'modules/notify';

@inject(UserData, Router, Notify)
export class List {
  heading = 'User management';

  users = [];

  constructor(data, router, notify) {
    this.data = data;
    this.router = router;
    this.notify = notify;
  }

  gotoUser(user) {
    this.router.navigateToRoute('edit', { id: user.id });
  }

  new() {
    this.router.navigateToRoute('create');
  }

  getData() {
    //implement spinner

    return this.data.getAll()
      .then(users => this.users = users);
  }

  activate() {
    return this.getData()
      .catch(error => this.notify.error(error));
  }
}
