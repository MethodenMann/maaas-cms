/// <reference path='../_all.ts' />
module maaas {
  maaas.app.controller('MasterCtrl', MasterCtrl);

  maaas.app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/cms');

    $stateProvider
      .state('cms', {
      url: '/cms',
      templateUrl: './app/master/view/master.html',
      controller: 'MasterCtrl'
    });
  });

}
