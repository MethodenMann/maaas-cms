module.exports = function (config) {

  config.set({
    files : [
      { pattern: 'out/libs/jquery.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/bootstrap.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/metisMenu.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/widget.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/jquery.iframe-transport.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/jquery.fileupload.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/jquery.cloudinary.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular-ui-router.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular-resource.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular-cookies.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular-translate.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular-translate-storage-local.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular-translate-storage-cookie.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular-translate-loader-partial.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/js-data.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/js-data-http.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/js-data-angular.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angularjs-color-picker.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/devise-min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/ui-grid.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/angular-breadcrumb.min.js', served: true, included: false, watched: false },
      { pattern: 'out/libs/tinymce.js', served: true, included: false, watched: false },


      { pattern: 'node_modules/traceur/bin/traceur-runtime.js', served: true, included: false, watched: false },
      { pattern: 'node_modules/systemjs/dist/system.js', served: true, included: false, watched: false },
      { pattern: 'node_modules/systemjs/dist/system-polyfills.js', served: true, included: false, watched: false },
      { pattern: 'node_modules/es6-module-loader/dist/es6-module-loader.js', served: true, included: false, watched: false },
      { pattern: 'out/app/**/*.js', served: true, included: false, watched: true }
    ],

    systemjs: {
      configFile: 'out/system.config.js',
      config: {
        baseURL: '/out/',
        paths: {
          'traceur': '../node_modules/traceur/bin/traceur-runtime.js',
          'systemjs': '../node_modules/systemjs/dist/system.js',
          'system-polyfills': '../node_modules/systemjs/dist/system-polyfills.js',
          'es6-module-loader': '../node_modules/es6-module-loader/dist/es6-module-loader.js'
          // ,
          // '*': 'out/app/*'
        }
      }
    },

    frameworks: ['mocha', 'chai', 'sinon', 'systemjs'],

    preprocessors: {
      'output/js/**/!(*.test).js': ['coverage']
    },

    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      reporters: [{
        type: 'json'
      }, {
          type: 'html'
        }, {
          type: 'text-summary'
        }],
      dir: 'output/coverage'
    },

    port: 9999,

    colors: true,

    //logLevel: config.LOG_DEBUG,
    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'], // Alternatively: 'PhantomJS'

    captureTimeout: 6000,

    singleRun: false

  });
};
