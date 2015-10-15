import {ListView} from './list-view';
import {KontaktIoService} from './kontaktio-service';
import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';


export function loadBeacon(app) {
  var componentName = 'beacons';

  app.directive(
    makeSelector(ListView),
    makeDirective(ListView));


  app.service('KontaktIoService', KontaktIoService);

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
        RouteUtil.getAbstractRoute(componentName, 'Beacons'))
      .state(`cms.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'Beacons'));
  });
}
