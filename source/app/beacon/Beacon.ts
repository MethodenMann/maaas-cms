import {OverviewCtrl} from './OverviewCtrl'
import {makeDirective, makeSelector} from '../utils/component';
import {GetMasterRoute} from '../master/RouteHelper';
import {KontaktIoService} from './KontaktIoService';

export function loadBeacon(app) {
  var componentName = 'beacon';
  app.controller('BeaconOverviewCtrl', OverviewCtrl);
  app.service('KontaktIoService', KontaktIoService);

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`, GetMasterRoute(componentName)
      )
      .state(`cms.${componentName}.overview`, {
      url: '/overview',
      templateUrl: './app/beacon/views/overview.html',
      controller: 'BeaconOverviewCtrl',
      controllerAs: 'ctrl'
    })
  });
}
