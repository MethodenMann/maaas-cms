/// <reference path='../_all.ts' />
module maaas {
  maaas.app.controller('TestCtrl', TestCtrl);

  maaas.app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.test', {
      url: '/test',
      templateUrl: './app/test/view/test.html'
    });
  });

}
