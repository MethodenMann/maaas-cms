/// <reference path='../_all.ts' />
module maaas {
  maaas.app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.imageUploadDemo', {
      url: '/imageUploadDemo',
      templateUrl: './app/imageUploadDemo/view/upload.html'
    });
  });
}
