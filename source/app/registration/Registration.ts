import {makeDirective, makeSelector} from '../utils/component';
import {RegistrationComponent} from './RegistrationComponent';

export function loadRegistration(app) {
  app.directive(
    makeSelector(RegistrationComponent),
    makeDirective(RegistrationComponent))

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('registration', {
      url: '/registration',
      templateUrl: './app/registration/view/registration.html'
    });
  });
}
