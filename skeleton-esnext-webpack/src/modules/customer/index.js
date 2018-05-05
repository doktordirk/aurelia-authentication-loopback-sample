import {PLATFORM} from 'aurelia-pal';

export class Index {
  configureRouter(config, router) {
    config.map([
      {route: ['', 'list'],  moduleId: PLATFORM.moduleName('./list'), name: 'list'},
      {route: 'edit/:id',  moduleId: PLATFORM.moduleName('./edit'), name: 'edit'},
      {route: 'create',  moduleId: PLATFORM.moduleName('./edit'), name: 'create'}
    ]);

    this.router = router;
  }
}
