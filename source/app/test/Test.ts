import {app} from '../app';
import {TestCtrl} from './TestCtrl';

app.controller('TestCtrl', TestCtrl);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('cms.test', {
    url: '/test',
    templateUrl: './app/test/view/test.html'
  });
});
