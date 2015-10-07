import {app} from '../app';

import {LoginCtrl} from './LoginCtrl';
import {LoginService} from './LoginService';

app.controller('LoginCtrl', LoginCtrl);
app.service('LoginService', LoginService);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
    url: '/login',
    templateUrl: './app/login/view/login.html',
    controller: 'LoginCtrl'
  });
});
