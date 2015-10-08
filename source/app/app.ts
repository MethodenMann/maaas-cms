import 'jquery';
import 'bootstrap';
import 'metis-menu';
import 'jquery-cloudinary';

import 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-resource';
import 'angular-translate';
import 'angular-translate-storage-cookie';
import 'angular-translate-loader-partial';
import 'angular-translate-storage-local';


import 'js-data';
import 'js-data-http';
import 'js-data-angular';

import 'devise';
import 'angularjs-color-picker';

import {makeDirective, makeSelector} from './utils/component';


import {loadApp} from './loadApp';

var leApp = angular.module('maaas', ['ngResource', 'ngCookies', 'pascalprecht.translate', 'js-data', 'ui.router', 'Devise', 'color.picker']);

leApp.config(function(DSProvider, DSHttpAdapterProvider, AuthProvider) {
  angular.extend(DSHttpAdapterProvider.defaults, {
    basePath: 'https://maaas-backend.herokuapp.com'
  });

  AuthProvider.loginPath('http://localhost:3000/users/sign_in.json');
  AuthProvider.registerPath('http://localhost:3000/users.json');
});


leApp.config(function($translateProvider, $translatePartialLoaderProvider) {
  var components = ['area', 'common/imagemanagement']
  angular.forEach(components, (component) => {
    $translatePartialLoaderProvider.addPart(component);
  });

  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: 'app/{part}/translations/{lang}.json'
  });

  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('de');
  $translateProvider.useLocalStorage();
});


loadApp(leApp);

// TODO: remove this
export var app = leApp;

angular.element(document).ready(function() {
  angular.bootstrap(document, ['maaas']);
});
