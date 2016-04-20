import {Router, RouterConfiguration} from 'aurelia-router';

export class Index {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {route: ['', 'list'], moduleId: './list', name: 'list'},
      {route: 'edit/:id', moduleId: './edit', name: 'edit'},
      {route: 'create', moduleId: './edit', name: 'create'}
    ]);

    this.router = router;
  }
}
