var gulp = require('gulp');
var paths = require('../paths');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var util = require('gulp-util');

gulp.task('node', function() {
  var nodeOptions = {
    script: paths.nodeStartUpScriptPath,
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
});
function log(msg) {
  util.log(util.colors.green(msg));
}
