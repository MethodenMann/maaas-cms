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

import {makeDirective, makeSelector} from './utils/component-utils';

import {DummyComponent} from './components/dummy-component/dummy';

angular.module('my-app', []);

angular.module('my-app')
.directive(
  makeSelector(DummyComponent),
  makeDirective(DummyComponent));


angular.element(document).ready(function() {
  angular.bootstrap(document, ['my-app']);
});
