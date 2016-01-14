import {inject} from 'aurelia-framework';
import {Notification} from 'spoonx/aurelia-notification';

@inject(Notification)
export class Notify {

  constructor(notification) {
    this.notification = notification;
  }

  success(_success) {
    this.notification.success(_success);
  }

  error(_error) {
    console.error(_error);

    this.formatError(_error)
      .then(message=>this.notification.error(message));
  }

  formatError(_error) {
    let message = _error;

    if (typeof(_error) === 'string') {
      if (_error === 'Failed to fetch') {
        message = 'No connection to the server';
      }
    } else if (_error.message) {
      return this.formatError(_error.message);
    } else if (_error.error) {
      return this.formatError(_error.error);
    } else if (_error instanceof Response) {
      return _error.json()
        .then(err=>this.formatError(err))
        .catch(err=> {
          if (_error.status === 404) {
            message = 'The requested resource does not exist';
          } else {
            message = 'Server response: ' + _error.statusText;
          }
        });
    }

    return Promise.resolve(message);
  }
}
