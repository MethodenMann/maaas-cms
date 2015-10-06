import {app} from '../app';

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('cms.imageUploadDemo', {
    url: '/imageUploadDemo',
    templateUrl: './app/imageUploadDemo/view/upload.html'
  });
});
