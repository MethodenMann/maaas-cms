import 'jquery';
import 'bootstrap';
import 'metis-menu';
import 'jquery-cloudinary';
import 'jquery.ui.sortable';

import 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-resource';
import 'angular-translate';
import 'angular-translate-storage-cookie';
import 'angular-translate-loader-partial';
import 'angular-translate-storage-local';
import 'angular-breadcrumb';
import 'angular-ui-tinymce';
import 'angular-ui-sortable';


import 'angular-chart';

import 'js-data';
import 'js-data-http';
import 'js-data-angular';

import 'devise';
import 'angularjs-color-picker';
import 'angular-ui-grid';

import 'maaas-config';
import {makeDirective, makeSelector} from './utils/component';



import {loadApp} from './loadApp';

var leApp = angular.module('maaas', [ 'maaas.config',
  'ngResource', 'ngCookies', 'pascalprecht.translate', 'js-data', 'ui.router',
  'Devise', 'color.picker', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit',
  'ncy-angular-breadcrumb', 'ui.tinymce', 'ui.sortable', 'chart.js'
]);

leApp.config(function(DSProvider, DSHttpAdapterProvider, AuthProvider, BACKEND_BASEURL) {

  angular.extend(DSHttpAdapterProvider.defaults, {
    basePath: BACKEND_BASEURL
  });

  AuthProvider.loginPath(`${BACKEND_BASEURL}/users/sign_in.json`);
  AuthProvider.logoutPath(`${BACKEND_BASEURL}/users/sign_out.json`);
  AuthProvider.registerPath(`${BACKEND_BASEURL}/users.json`);
});

leApp.config(function($translateProvider, $translatePartialLoaderProvider) {
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: 'app/{part}/translations/{lang}.json'
  });

  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('de');
  $translateProvider.useLocalStorage();
});

leApp.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      //includeAbstract: true
    });
  });

// This is needed so the session is sent back to the backend with
// every request.
leApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }
]);

leApp.run(function ($rootScope, Auth, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    console.log(toState.data);
    if (toState.data && toState.data.ignoreLogin) {
      console.log('ignoring login!');
    } else {
      if (!Auth.isAuthenticated()) {
        console.log('getting user from memory failed. trying to get user from server session');
        Auth.currentUser().then((user) => {
          console.log('user is authenticated!');
        }, (error) => {
          console.log('user is not authenticated!');
          event.preventDefault();
          $state.go('login');
        });
      } else {
        console.log('user is authenticated!');
      }
    }
  });
});

loadApp(leApp);

// TODO: remove this
export var app = leApp;

angular.element(document).ready(function() {
  angular.bootstrap(document, ['maaas']);
});
