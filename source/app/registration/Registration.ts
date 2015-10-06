/// <reference path='../_all.ts' />

module maaas {
  maaas.app.controller('RegistrationCtrl', RegistrationCtrl);

  maaas.app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('registration', {
      url: '/registration',
      templateUrl: './app/registration/view/registration.html',
      controller: 'RegistrationCtrl'
    });
  });
}
