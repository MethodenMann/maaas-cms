import 'jquery';
import 'bootstrap';
import 'metis-menu';
import 'widget';
import 'jquery-iframe-transport';
// TODO: these have special require syntax built in which fucks up System.js
//       we need to fix that >:(
// import 'jquery-fileupload';
// import 'jquery-cloudinary';

import 'angular';
import 'angular-ui-router';
import 'angular-resource';

import 'js-data';
import 'js-data-http';
import 'js-data-angular';

import 'devise'

import {loadArea} from './area/Area';
import {loadMaster} from './master/Master';
import {loadJsDataConfig} from './jsDataConfig';

import {makeDirective, makeSelector} from './utils/component-utils';

import {DummyComponent} from './components/dummy-component/dummy';

var leApp = angular.module('maaas', ['ngResource', 'js-data', 'ui.router', 'Devise']);

leApp.config(function (DSProvider, DSHttpAdapterProvider) {
  angular.extend(DSHttpAdapterProvider.defaults, {
    basePath: 'https://maaas-backend.herokuapp.com'
  });
});

loadJsDataConfig(leApp);
loadMaster(leApp);
loadArea(leApp);

// angular.module('my-app')
// .directive(
//   makeSelector(DummyComponent),
//   makeDirective(DummyComponent));
//
//

// TODO: remove this
export var app = leApp;

angular.element(document).ready(function() {
  angular.bootstrap(document, ['maaas']);
});
