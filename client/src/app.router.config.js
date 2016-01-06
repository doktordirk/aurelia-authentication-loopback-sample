import {AuthorizeStep} from 'spoonx/aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export default class {

 constructor(router) {
   this.router = router;
 }
 configure() {
   let appRouterConfig = function(config) {
     config.title = 'Aurelia-Auth-Loopback';
     config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.

     config.map([
      { route: ['', 'welcome'], name: 'welcome',  moduleId: './modules/welcome',      nav: true, title: 'Welcome' },
      // not working with only one api endpoint
      // { route: 'users',       name: 'users',   moduleId: './modules/users',        nav: true, title: 'Users' },
      { route: 'customers',   name: 'customers',  moduleId: './modules/customers',    nav: true, title: 'Customers'},
      { route: 'customer',    name: 'customer',   moduleId: './modules/customer/index', nav: true, title: 'Manage customers', auth: true },
      { route: 'signup',      name: 'signup',     moduleId: './modules/auth/signup',  nav: false, title: 'Signup' },
      { route: 'login',       name: 'login',      moduleId: './modules/auth/login',   nav: false, title: 'Login' },
      { route: 'logout',      name: 'logout',     moduleId: './modules/auth/logout',  nav: false, title: 'Logout', auth: true },
      { route: 'profile',     name: 'profile',    moduleId: './modules/auth/profile', nav: false, title: 'Profile', auth: true },
      { route: 'confirm',     name: 'confirm',    moduleId: './modules/auth/confirm', nav: false, title: 'Confirm' },
      { route: 'confirmed',   name: 'confirmed',  moduleId: './modules/auth/confirmed', nav: false, title: 'Confirmed' }
     ]);
   };

   this.router.configure(appRouterConfig);
 }
}
