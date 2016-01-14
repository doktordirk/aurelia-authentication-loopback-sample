import {inject} from 'aurelia-framework';
import {User} from './user';

@inject(User)
export class AdminStep {
  constructor(user) {
    this.user = user;
  }

  run(routingContext, next) {
    let isAdmin = this.user.isAdmin();

    if (routingContext.getAllInstructions().some(i => i.config.settings.admin)) {
      if (!isAdmin) {
        return next.cancel();
      }
    }

    return next();
  }
}
