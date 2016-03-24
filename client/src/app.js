import AppRouterConfig from 'app.router.config';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { FetchConfig } from 'spoonx/aurelia-authentication';

@inject( Router, FetchConfig, AppRouterConfig )
export class App {
 constructor( router, fetchConfig, appRouterConfig ) {
   this.router = router;
   this.fetchConfig = fetchConfig;
   this.appRouterConfig = appRouterConfig;
 }

 activate() {
   this.appRouterConfig.configure();
   this.fetchConfig.configure();
 }
}
