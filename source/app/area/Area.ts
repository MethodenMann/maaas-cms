/// <reference path='../_all.ts' />
/// <reference path='./IArea.ts'/>
/// <reference path='./OverviewCtrl.ts' />
/// <reference path='./DetailCtrl.ts' />


module maaas {

  maaas.app.controller('OverviewCtrl', OverviewCtrl);
  maaas.app.controller('DetailCtrl', DetailCtrl);

  maaas.app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.areas', {
      url: '/areas',
      templateUrl: './app/area/views/overview.html',
      controller: 'OverviewCtrl',
      controllerAs: 'ctrl'
    })
      .state('cms.area', {
      url: '/areas/:areaId',
      templateUrl: './app/area/views/detail.html',
      controller: 'DetailCtrl',
      controllerAs: 'ctrl'
    });
  });

}
