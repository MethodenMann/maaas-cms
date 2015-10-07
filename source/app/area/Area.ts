// import {app} from '../app';
import {OverviewCtrl} from './OverviewCtrl';
import {DetailCtrl} from './DetailCtrl';
import {CreateCtrl} from './CreateCtrl';
import {GetMasterRoute} from '../master/RouteHelper';

export function loadArea(app) {
  app.controller('OverviewCtrl', OverviewCtrl);
  app.controller('DetailCtrl', DetailCtrl);
  app.controller('CreateCtrl', CreateCtrl);

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.area', GetMasterRoute('area'))
      .state('cms.area.overview', {
      url: '/area/overview',
      templateUrl: './app/area/views/overview.html',
      controller: 'OverviewCtrl',
      controllerAs: 'ctrl'
    })
      .state('cms.area.detail', {
      url: '/{areaId:[0-9]{1,8}}',
      templateUrl: './app/area/views/detail.html',
      controller: 'DetailCtrl',
      controllerAs: 'ctrl'
    })
      .state('cms.area.create', {
      url: '/create',
      templateUrl: './app/area/views/detail.html',
      controller: 'CreateCtrl',
      controllerAs: 'ctrl'
    });
  });
}
