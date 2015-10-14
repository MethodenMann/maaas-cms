import {ListView} from './list-view';
import {KontaktIoService} from './kontaktio-service';
import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';


export function loadBeacon(app) {
  var componentName = 'beacon';

  app.directive(
    makeSelector(ListView),
    makeDirective(ListView));


  app.service('KontaktIoService', KontaktIoService);

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`, RouteUtil.GetMasterRoute(componentName, 'Beacon')
      )
      .state(`cms.${componentName}.list`, {
      url: '/list',
      template: '<mas-beacon-list-view/>',
      ncyBreadcrumb: {
        label: 'asd'
      }
    });
  });
}
