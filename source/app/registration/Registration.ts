import {makeDirective, makeSelector} from '../utils/component';
import {RegistrationComponent} from './RegistrationComponent';

export function loadRegistration(app) {
  app.directive(
    makeSelector(RegistrationComponent),
    makeDirective(RegistrationComponent));

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('registration', {
      url: '/register',
      templateUrl: './app/registration/view/registration.html',
      data: {
        ignoreLogin: true
      }
    });
  });
}
