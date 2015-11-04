import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {ListView} from './list-view';


export function loadStatistic(app) {
  var componentName = 'statistics';

  app.directive(
    makeSelector(ListView),
    makeDirective(ListView));


  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
        RouteUtil.getAbstractRoute(`/${componentName}`, 'Statistiken'))
      .state(`cms.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'Statistiken'));
  });
}
