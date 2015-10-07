import {app} from '../app';

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('cms.beacons', {
    url: '/beacons',
    templateUrl: './app/beacons/view/beacons.html'
  });
});
