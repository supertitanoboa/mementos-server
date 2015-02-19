// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');

// Lint Task
gulp.task('lint', function(done) {
    'use strict';
    return gulp.src(['gulpfile.js', 'server/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'), done);
});


gulp.task('mocha', ['lint'], function(done) {
  'use strict';
  return gulp.src('tests/**/*.js')
    .pipe(mocha({reporter: 'spec'}), done);
});


gulp.task('nodemon', ['test'], function() {
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
gulp.task('test', ['mocha'], function(done) {
  'use strict';
  done();
});


// Watch Files For Changes
gulp.task('watch', function() {
  'use strict';
  gulp.watch('server/**/*.js', ['lint']);
});

//create postgres server
gulp.task('servercreate', shell.task([
  'mkdir -p pgsql/data',
  'initdb -D ./pgsql/data',
  'postgres -D ./pgsql/data'
]));

gulp.task('serversetup', shell.task([
  'createuser "user"',
  'createdb test'
]));

//CAUTION: THIS IS AN RM -RF
gulp.task('serverdelete', shell.task([
  'rm -rf ./pgsql'
]));

// Default Task
gulp.task('default', ['nodemon']);
