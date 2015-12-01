import {makeDirective, makeSelector} from '../utils/component';
import {RegistrationComponent} from './registration-component';

export function loadRegistration(app) {
  app.directive(
    makeSelector(RegistrationComponent),
    makeDirective(RegistrationComponent));

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('registration', {
      url: '/register',
      templateUrl: './app/registration/registration.html',
      data: {
        ignoreLogin: true
      }
    });
  });
}
