/// <reference path='../_all.ts' />
module maaas {
  maaas.app.controller('TestCtrl', TestCtrl);
  maaas.app.config(['$routeProvider',
    function routes($routeProvider) {
      $routeProvider
        .when('/test', {
        templateUrl: './app/test/view/test.html',
        controller: 'TestCtrl'
      });
    }
  ]);

}
