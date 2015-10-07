import 'jquery';
import 'bootstrap';
import 'metis-menu';
import 'jquery-cloudinary';

import 'angular';
import 'angular-ui-router';
import 'angular-resource';

import 'js-data';
import 'js-data-http';
import 'js-data-angular';

import 'devise';
import 'angularjs-color-picker';

import {makeDirective, makeSelector} from './utils/component';


import {loadApp} from './loadApp';

var leApp = angular.module('maaas', ['ngResource', 'js-data', 'ui.router', 'Devise', 'color.picker']);

leApp.config(function (DSProvider, DSHttpAdapterProvider, AuthProvider) {
  angular.extend(DSHttpAdapterProvider.defaults, {
    basePath: 'https://maaas-backend.herokuapp.com'
  });

  AuthProvider.loginPath('http://localhost:3000/users/sign_in.json');
  AuthProvider.registerPath('http://localhost:3000/users.json');
});

loadApp(leApp);

// TODO: remove this
export var app = leApp;

angular.element(document).ready(function() {
  angular.bootstrap(document, ['maaas']);
});
