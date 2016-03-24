import {AdminStep} from './modules/auth/admin-step';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthorizeStep} from 'spoonx/aurelia-authentication';

@inject(Router)
export default class {

 constructor(router) {
   this.router = router;
 }
 configure() {
   let appRouterConfig = function(config) {
     config.title = 'Aurelia-Auth-Loopback';
     config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
     config.addPipelineStep('authorize', AdminStep); // Add a route filter to the authorize extensibility point.

     config.map([
      { route: ['', 'welcome'], name: 'welcome',  moduleId: './modules/welcome',        nav: true, title: 'Welcome' },
      { route: 'customers',   name: 'customers',  moduleId: './modules/customers',      nav: true, title: 'Customers' },
      { route: 'customer',    name: 'customer',   moduleId: './modules/customer/index', nav: true, title: 'Manage customers', auth: true },
      { route: 'user',        name: 'user',       moduleId: './modules/user/index',     nav: true,  title: 'Manage users', auth: true, settings: {admin: true} },
      { route: 'signup',      name: 'signup',     moduleId: './modules/auth/signup',    nav: false, title: 'Signup' },
      { route: 'login',       name: 'login',      moduleId: './modules/auth/login',     nav: false, title: 'Login' },
      { route: 'logout',      name: 'logout',     moduleId: './modules/auth/logout',    nav: false, title: 'Logout', auth: true },
      { route: 'profile',     name: 'profile',    moduleId: './modules/auth/profile',   nav: false, title: 'Profile', auth: true },
      { route: 'confirm',     name: 'confirm',    moduleId: './modules/auth/confirm',   nav: false, title: 'Confirm' },
      { route: 'confirmed',   name: 'confirmed',  moduleId: './modules/auth/confirmed', nav: false, title: 'Confirmed' },
      { route: 'request-password-reset', moduleId: './modules/auth/request-password-reset', nav: false, title: 'Request password reset' },
      { route: 'reset-password',         moduleId: './modules/auth/reset-password',     nav: false, title: 'Reset password' }
     ]);
   };

   this.router.configure(appRouterConfig);
 }
}
