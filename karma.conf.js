// Karma configuration
// Generated on Wed Aug 16 2017 22:07:53 GMT+0300 (FLE Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine', 'karma-typescript'],


    // list of files / patterns to load in the browser
    files: [
      'src/**/*.ts',
      'init-test-bed.spec.ts',
    ],


    // list of files to exclude
    exclude: [
        'application/*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
          'src/**/*.ts': ['karma-typescript']
      },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    karmaTypescriptConfig: {
        bundlerOptions: {
            entrypoints: /\.spec\.ts$/,
            transforms: [
                require('karma-typescript-angular2-transform')
            ]
        },
        compilerOptions: {
            lib: ['ES2015', 'DOM']
        }
    },
    reporters: ['progress', 'karma-typescript'],

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
