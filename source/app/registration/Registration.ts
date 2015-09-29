/// <reference path='../_all.ts' />

module maaas {
  maaas.app.controller('RegistrationCtrl', RegistrationCtrl);
  // maaas.app.service('LoginService', LoginService);
  // maaas.app.directive('loginButton', <any>LoginButton);


  maaas.app.config(['$routeProvider',
    function routes($routeProvider) {
      $routeProvider
        .when('/registration', {
        templateUrl: './app/registration/view/registration.html',
        controller: 'RegistrationCtrl'
      });
    }
  ]);
}
