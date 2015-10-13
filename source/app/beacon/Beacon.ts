import {ListView} from './list-view';
import {KontaktIoService} from './kontaktio-service';
import {makeDirective, makeSelector} from '../utils/component';
import {GetMasterRoute} from '../master/RouteHelper';


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
      .state(`cms.${componentName}`, GetMasterRoute(componentName)
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
