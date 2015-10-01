/// <reference path='../_all.ts' />
/// <reference path='./IArea.ts'/>
/// <reference path='./OverviewCtrl.ts' />
/// <reference path='./DetailCtrl.ts' />
/// <reference path='./CreateCtrl.ts' />


module maaas {
  maaas.app.controller('OverviewCtrl', OverviewCtrl);
  maaas.app.controller('DetailCtrl', DetailCtrl);
  maaas.app.controller('CreateCtrl', CreateCtrl);




  maaas.app.config(function($stateProvider, $urlRouterProvider) {
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
