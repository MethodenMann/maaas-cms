// import {app} from '../app';
import {OverviewCtrl} from './OverviewCtrl';
import {DetailCtrl} from './DetailCtrl';
import {CreateCtrl} from './CreateCtrl';
import {AreaButtonDirective} from './AreaButtonDirective';
import {makeDirective, makeSelector} from '../utils/component';
import {GetMasterRoute} from '../master/RouteHelper';

export function loadArea(app) {
  var componentName = 'area';
  app.controller('AreaOverviewCtrl', OverviewCtrl);
  app.controller('AreaDetailCtrl', DetailCtrl);
  app.controller('AreaCreateCtrl', CreateCtrl);

  app.directive(makeSelector(AreaButtonDirective), makeDirective(AreaButtonDirective));


  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });



  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.area', GetMasterRoute('area')
      )
      .state('cms.area.overview', {
      url: '/overview',
      templateUrl: './app/area/views/overview.html',
      controller: 'AreaOverviewCtrl',
      controllerAs: 'ctrl'
    })
      .state('cms.area.detail', {
      url: '/{areaId:[0-9]{1,8}}',
      templateUrl: './app/area/views/detail.html',
      controller: 'AreaDetailCtrl',
      controllerAs: 'ctrl'
    })
      .state('cms.area.create', {
      url: '/create',
      templateUrl: './app/area/views/detail.html',
      controller: 'AreaCreateCtrl',
      controllerAs: 'ctrl'
    });
  });
}
