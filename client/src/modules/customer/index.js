import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Index {

  constructor(http) {
    this.http = http;
  }

  activate() {
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('api/');
    });
  }

  configureRouter(config, router) {
    config.map([
      {route: ['', 'list'], moduleId: './list', name: 'list'},
      {route: 'edit/:id', moduleId: './edit', name: 'edit'},
      {route: 'create', moduleId: './edit', name: 'create'}
    ]);

    this.router = router;
  }
}