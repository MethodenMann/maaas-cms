/// <reference path='../_all.ts' />
module maaas {
  maaas.app.config(['$routeProvider',
    function routes($routeProvider) {
      $routeProvider
        .when('/imageUploadDemo', {
        templateUrl: './app/imageUploadDemo/view/upload.html'
        // controller: 'LoginCtrl'
      });
    }
  ]);
}
