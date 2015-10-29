import {ListView} from './list-view';
import {DynamicInputComponent} from './dynamic-input-component';
import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';


export function loadTranslations(app) {
  var componentName = 'translations';

  app.directive(
    makeSelector(ListView),
    makeDirective(ListView));

  app.directive(
    makeSelector(DynamicInputComponent),
    makeDirective(DynamicInputComponent));

  // app.config(function($translateProvider, $translatePartialLoaderProvider) {
  //   $translatePartialLoaderProvider.addPart(componentName);
  // });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
        RouteUtil.getAbstractRoute('/translations', 'translations'))
      .state(`cms.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'translations'));
  });
}
