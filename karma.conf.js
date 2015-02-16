module.exports = function(config) {
  'use strict';
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: './',

    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],

    // list of files / patterns to load in the browser
    files: [
      'tests/**/*.js'
    ],

    exclude: [
      'karma.conf.js'
    ],

    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,

    preprocessors: {
      // Source files you want to generate coverage reports for
      // This should not include tests or libraries
      // These files will be instrumented by Istanbul
      'server/**/*.js': ['coverage']
    },

    // Configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'results/coverage/'
    },

    captureTimeout: 20000,
    singleRun: false,
    reportSlowerThan: 500,

    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-sinon'
    ]
  });
};
