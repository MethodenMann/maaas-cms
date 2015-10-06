import {app} from '../app';
import {RegistrationCtrl} from './RegistrationCtrl';

app.controller('RegistrationCtrl', RegistrationCtrl);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('registration', {
    url: '/registration',
    templateUrl: './app/registration/view/registration.html',
    controller: 'RegistrationCtrl'
  });
});
