import gulp from 'gulp';
import browserSync from 'browser-sync';
import proxy from 'proxy-middleware';
import project from '../aurelia.json';
import build from './build';
import {CLIOptions} from 'aurelia-cli';
var url = require('url');

var nodemon = require('gulp-nodemon');
var util = require('gulp-util');
var path = require('path');

let node = function() {
  var nodeOptions = {
    script: path.join( path.normalize('./../server'),  'server.js'),
    delayTime: 1,
    watch: ['./../server', './../common']
  };

  nodemon(nodeOptions)
    .on('change', function() {
      log('nodemon detected change...!');
    })
    .on('restart', function() {
      log('node application is restarted!');
    })
    .on('restart', function(ev) {
      log('*** nodemon restarted');
      log('files changed on restart:\n' + ev);
      setTimeout(function() {
        browserSync.notify('reloading now ...');
        browserSync.reload({stream: false});
      }, 1000);
    });
};

function log(msg) {
  util.log(util.colors.green(msg));
}


function onChange(path) {
  console.log(`File Changed: ${path}`);
}

function reload(done) {
  browserSync.reload();
  done();
}


let serve = gulp.series(
  build,
  gulp.parallel(node,
  done => {
console.log('client')
  let middleware = [function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }];

  //if (CLIOptions.hasFlag('node-server')) {
    var proxyOptionsApiRoute = url.parse('http://localhost:' + 3000 +  '/api');
    proxyOptionsApiRoute.route = '/api';
    middleware.push(proxy(proxyOptionsApiRoute));
  //}	

    browserSync({
      online: false,
      open: false,
      port: 9000,
      server: {
        baseDir: ['.'],
        middleware: middleware
      }
    }, done);
  })
);

let refresh = gulp.series(
  build,
  reload
);

let watch = function() {
  gulp.watch(project.transpiler.source, refresh).on('change', onChange);
  gulp.watch(project.markupProcessor.source, refresh).on('change', onChange);
  gulp.watch(project.cssProcessor.source, refresh).on('change', onChange)
}

let run;

if (CLIOptions.hasFlag('watch')) {
  run = gulp.series(
    serve,
    watch
  );
} else {
  run = serve;
}

export default run;
