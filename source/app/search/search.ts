import {ListView} from './list-view';
import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';

export function loadSearch(app) {
  var componentName = 'search';


  app.config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function ($stateProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
        RouteUtil.getAbstractRoute(`/${componentName}`, 'Suche'))
      .state(`cms.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'Suche'));
  });
}
