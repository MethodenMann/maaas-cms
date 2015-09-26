/// <reference path='../_all.ts' />
module maaas {
  maaas.app.controller('LoginCtrl', LoginCtrl);
  maaas.app.service('LoginService', LoginService);



  maaas.app.config(['$routeProvider',
    function routes($routeProvider) {
      $routeProvider
        .when('/login', {
        templateUrl: './app/login/view/login.html',
        controller: 'LoginCtrl'
      });
    }
  ]);

}
