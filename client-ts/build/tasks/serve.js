var gulp = require('gulp');
var browserSync = require('browser-sync');
var proxy = require('proxy-middleware');
var url = require('url');
var paths = require('../paths');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:nodeJsPort
gulp.task('serve', ['build', 'node'], function(done) {
  var proxyOptionsAccessControl = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  };
  var proxyOptionsApiRoute = url.parse('http://localhost:' + paths.nodeJsPort +  '/api');
  proxyOptionsApiRoute.route = '/api';

  browserSync({
    online: false,
    open: false,
    port: paths.webServerPort,
    server: {
      baseDir: ['.'],
      middleware: [
        proxyOptionsAccessControl,
        proxy(proxyOptionsApiRoute)]
    }
  }, done);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:nodeJsPort
gulp.task('serve-bundle', ['bundle', 'node'], function(done) {
  var proxyOptionsAccessControl = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  };
  var proxyOptionsApiRoute = url.parse('http://localhost:' + paths.nodeJsPort +  '/api');
  proxyOptionsApiRoute.route = '/api';

  browserSync({
    online: false,
    open: false,
    port: paths.webServerPort,
    server: {
      baseDir: ['.'],
      middleware: [
        proxyOptionsAccessControl,
        proxy(proxyOptionsApiRoute)]
    }
  }, done);
});
