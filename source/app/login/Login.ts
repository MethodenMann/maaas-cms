import {makeDirective, makeSelector} from '../utils/component';
import {LoginComponent} from './LoginComponent';

export function loadLogin(app) {
  app.directive(
    makeSelector(LoginComponent),
    makeDirective(LoginComponent));

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
      url: '/login',
      templateUrl: './app/login/view/login.html',
      data: {
        ignoreLogin: true
      }
    });
  });
}
