// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var nodemon = require('gulp-nodemon');

// Lint Task
gulp.task('lint', function() {
    'use strict';
    return gulp.src(['gulpfile.js', '*/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('karma', function (done) {
  'use strict';
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});


gulp.task('tdd', function (done) {
  'use strict';
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});


gulp.task('nodemon', function() {
  'use strict';
  nodemon({
    script  : 'server.js',
    ext     : 'js',
    ignore  : ['node_modules/*']
  })
  .on('start', ['watch'])
  .on('change', ['watch']);
});


//run tests
gulp.task('test', ['karma']);


// Watch Files For Changes
gulp.task('watch', function() {
  'use strict';
  gulp.watch('js/*.js', ['lint']);
});


// Default Task
gulp.task('default', ['lint', 'test', 'nodemon']);
