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
    let message = 'Error: ' + JSON.stringify(_error);

    if (typeof(_error) === 'string') {
      message = _error;
    }
    else if (_error instanceof Response) {
      if (_error.status === 404) {
        message = 'The requested resource does not exist';
      } else {
        message = 'Server response: ' + _error.statusText;
      }
    } else if (_error instanceof Error) {
      if (_error.message === 'Failed to fetch') {
        message = 'No connection to the server';
      } else {
        message = _error.message;
      }
    } else if (_error.error) {
      if ( typeof(_error.error) === 'String' ) {
        message = _error.error;
      } else {
        message = JSON.stringify(_error.error);
      }
    }

    this.notification.error(message);
  }
}
