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


import 'js-data';
import 'js-data-http';
import 'js-data-angular';

import 'devise';
import 'angularjs-color-picker';
import 'angular-ui-grid';
import {makeDirective, makeSelector} from './utils/component';


import {loadApp} from './loadApp';

var leApp = angular.module('maaas', [
  'ngResource', 'ngCookies', 'pascalprecht.translate', 'js-data', 'ui.router',
  'Devise', 'color.picker', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit',
  'ncy-angular-breadcrumb', 'ui.tinymce', 'ui.sortable'
]);

leApp.config(function(DSProvider, DSHttpAdapterProvider, AuthProvider) {
  angular.extend(DSHttpAdapterProvider.defaults, {
    basePath: 'https://maaas-backend.herokuapp.com'
  });

  AuthProvider.loginPath('http://localhost:3000/users/sign_in.json');
  AuthProvider.logoutPath('http://localhost:3000/users/sign_out.json');
  AuthProvider.registerPath('http://localhost:3000/users.json');
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
])

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
