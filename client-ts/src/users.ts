import { inject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';

@inject(Endpoint.of('github'))
export class Users {
  heading = 'Github Users';
  users = [];
  githubEndpoint: Rest;

  constructor(private endpoint: Rest) {
    this.githubEndpoint = endpoint;
  }

  activate() {
    return this.githubEndpoint.find('users')
      .then(users => this.users = users);
  }
}
