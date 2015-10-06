import 'angular';

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
