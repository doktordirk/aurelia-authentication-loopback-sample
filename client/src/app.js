import AppRouterConfig from 'app.router.config';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject( Router, AppRouterConfig )
export class App {
 constructor( router, appRouterConfig ) {
   this.router = router;
   this.appRouterConfig = appRouterConfig;
 }

 activate() {
   this.appRouterConfig.configure();
 }
}
