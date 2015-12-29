var gulp   = require('gulp');
var paths  = require('../paths');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src(paths.source)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});
