// Karma configuration
// Generated on Sun Jun 11 2017 22:32:47 GMT+0200 (CEST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'karma-typescript'],


        // list of files / patterns to load in the browser
        files: [
            'init-test-bed.spec.ts',
            'src/**/*.ts'
        ],


        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },

        karmaTypescriptConfig: {
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/,
                transforms: [
                    require('karma-typescript-angular2-transform')
                ]
            },
            compilerOptions: {
                lib: ['ES2015', 'DOM']
            },
            reports:
                {
                    "cobertura": {
                        "directory": "coverage",
                        "filename": "coverage.xml",
                        "subdirectory": "cobertura"
                    },
                    "html": "coverage",
                    "text-summary": "",
                    "lcovonly": {
                        "directory": "coverage",
                        "filename": "lcov.info",
                        "subdirectory": "lcovonly"
                    }
                }
        },
        customLaunchers: {
            Chrome_with_debugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9222'],
                debug: true
            }
        },
        browserNoActivityTimeout: 100000,
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'karma-typescript'],


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
        browsers: ['ChromeHeadless'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}