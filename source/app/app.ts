import 'jquery';
import 'bootstrap';
import 'metis-menu';
import 'jquery-cloudinary';
import 'jquery.ui.sortable';
import 'angular';
import 'angular-bootstrap';
import 'angular-bootstrap-tpls';
import 'angular-animate';
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
import 'angular-socket-io';
import 'angular-chart';
import 'js-data';
import 'js-data-http';
import 'js-data-angular';
import 'devise';
import 'angularjs-color-picker';
import 'maaas-config';
import {makeDirective, makeSelector} from './utils/component';


import {loadApp} from './loadApp';

var cmsApp = angular.module('maaas', ['maaas.templates', 'maaas.config', 'ngResource', 'ngCookies', 'pascalprecht.translate', 'js-data',
  'ui.router', 'Devise', 'color.picker', 'btford.socket-io', 'ncy-angular-breadcrumb', 'ui.tinymce', 'ui.sortable',
  'chart.js', 'ngAnimate', 'ui.bootstrap'
]);

cmsApp.config(function (DSProvider, DSHttpAdapterProvider, AuthProvider, BACKEND_BASEURL) {
  angular.extend(DSHttpAdapterProvider.defaults, {
    basePath: BACKEND_BASEURL
  });

  AuthProvider.loginPath(`${BACKEND_BASEURL}/users/sign_in.json`);
  AuthProvider.logoutPath(`${BACKEND_BASEURL}/users/sign_out.json`);
  AuthProvider.registerPath(`${BACKEND_BASEURL}/users.json`);
});


cmsApp.config(function ($translateProvider, $translatePartialLoaderProvider) {
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: 'app/{part}/translations/{lang}.json'
  });

  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('de');
  $translateProvider.useLocalStorage();
});

cmsApp.config(function ($breadcrumbProvider) {
  $breadcrumbProvider.setOptions({
    //includeAbstract: true
  });
});


cmsApp.config(['$httpProvider', function ($httpProvider) {
  // This is needed so the session is sent back to the backend with every request.
  $httpProvider.defaults.withCredentials = true;
}
]);

function doMuseumCheck(Auth, toState, $state) {
  Auth.currentUser().then((user) => {
    if (!user.museum_id) {
      if (toState.name !== 'cms.museums.create') {
        $state.go('cms.museums.create');
      }
    }
  });
}

cmsApp.run(function ($rootScope, Auth, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.data && toState.data.ignoreLogin) {
      console.log('ignoring login!');
    } else {
      if (!Auth.isAuthenticated()) {
        console.log('getting user from memory failed. trying to get user from server session');

        Auth.currentUser().then((user) => {
          console.log('retrieved user from server session. user is now authenticated!');
          doMuseumCheck(Auth, toState, $state);
        }, (error) => {
          console.log('no user from server session. user is not authenticated!');
          event.preventDefault();
          $state.go('login');
        });
      } else {
        doMuseumCheck(Auth, toState, $state);
      }
    }
  });
});

loadApp(cmsApp);

export var app = cmsApp;

angular.element(document).ready(function () {
  angular.bootstrap(document, ['maaas']);
});
