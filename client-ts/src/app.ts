import {Router, RouterConfiguration} from 'aurelia-router'
import {AuthenticateStep} from 'aurelia-authentication';


export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
   config.title = 'Aurelia-Authentication-Loopback-Ts';
   config.addPipelineStep('authorize', AuthenticateStep); // Add a route filter to the authorize extensibility point.

   config.map([
    { route: ['', 'welcome'], name: 'welcome',    moduleId: 'welcome',                  nav: true,  title: 'Welcome' },
    { route: 'users',         name: 'users',      moduleId: 'users',                    nav: true,  title: 'Github Users' },
    { route: 'customers',     name: 'customers',  moduleId: 'customers',                nav: true,  title: 'List Customers' },
    { route: 'customer',      name: 'customer',   moduleId: './modules/customer/index', nav: true,  title: 'Manage Customers', auth: true },

    { route: 'signup',        name: 'signup',     moduleId: './modules/auth/signup',    nav: false, title: 'Signup' },
    { route: 'login',         name: 'login',      moduleId: './modules/auth/login',     nav: false, title: 'Login' },
    { route: 'logout',        name: 'logout',     moduleId: './modules/auth/logout',    nav: false, title: 'Logout',  auth: true },
    { route: 'profile',       name: 'profile',    moduleId: './modules/auth/profile',   nav: false, title: 'Profile', auth: true }
   ]);

    this.router = router;
  }
}
