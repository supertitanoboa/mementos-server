// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

// Lint Task
gulp.task('lint', function() {
    'use strict';
    return gulp.src(['gulpfile.js', 'server/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('mocha', function() {
  'use strict';
  return gulp.src('tests/**/*.js')
    .pipe(mocha({reporter: 'spec'}));
});


gulp.task('nodemon', function() {
  'use strict';
  nodemon({
    script  : 'server/server.js',
    ext     : 'js',
    ignore  : ['node_modules/**/*']
  })
  .on('start', ['watch'])
  .on('change', ['watch']);
});


//run tests
gulp.task('test', ['mocha']);


// Watch Files For Changes
gulp.task('watch', function() {
  'use strict';
  gulp.watch('server/**/*.js', ['lint']);
});


// Default Task
gulp.task('default', ['lint', 'test', 'nodemon']);
