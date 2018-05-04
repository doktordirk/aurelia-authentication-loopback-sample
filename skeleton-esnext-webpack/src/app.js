import {AuthorizeStep} from 'aurelia-authentication';
import {PLATFORM} from 'aurelia-pal';

export class App {
 configureRouter(config, router) {
   config.title = 'Aurelia-Authentication-Loopback';
   config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.

   config.map([
    { route: ['', 'welcome'], name: 'welcome',    moduleId: PLATFORM.moduleName('./welcome'),                  nav: true,  title: 'Welcome' },
    { route: 'users',         name: 'users',      moduleId: PLATFORM.moduleName('./users'),                    nav: true,  title: 'Github Users' },
    { route: 'customers',     name: 'customers',  moduleId: PLATFORM.moduleName('./customers'),                nav: true,  title: 'List Customers' },
    { route: 'customer',      name: 'customer',   moduleId: PLATFORM.moduleName('./modules/customer/index'), nav: true,  title: 'Manage Customers', auth: true },

    { route: 'signup',        name: 'signup',     moduleId: PLATFORM.moduleName('./modules/auth/signup'),    nav: false, title: 'Signup' },
    { route: 'login',         name: 'login',      moduleId: PLATFORM.moduleName('./modules/auth/login'),     nav: false, title: 'Login' },
    { route: 'logout',        name: 'logout',     moduleId: PLATFORM.moduleName('./modules/auth/logout'),    nav: false, title: 'Logout',  auth: true },
    { route: 'profile',       name: 'profile',    moduleId: PLATFORM.moduleName('./modules/auth/profile'),   nav: false, title: 'Profile', auth: true }
   ]);

   this.router = router;
 }
}
