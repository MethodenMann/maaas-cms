/// <reference path='../_all.ts' />

module maaas {
  maaas.app.controller('LoginCtrl', LoginCtrl);
  maaas.app.service('LoginService', LoginService);
  maaas.app.directive('loginButton', <any>LoginButton);

  maaas.app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
      url: '/login',
      templateUrl: './app/login/view/login.html',
      controller: 'LoginCtrl'
    });
  });

}
