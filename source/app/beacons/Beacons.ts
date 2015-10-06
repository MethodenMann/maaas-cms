/// <reference path='../_all.ts' />
module maaas {

  maaas.app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.beacons', {
      url: '/beacons',
      templateUrl: './app/beacons/view/beacons.html'
    });
  });

}
