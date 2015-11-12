import {makeDirective, makeSelector} from '../utils/component';
import {LoginComponent} from './login-component';

export function loadLogin(app) {
  var componentName = 'login';


  app.directive(
    makeSelector(LoginComponent),
    makeDirective(LoginComponent));

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
      url: '/login',
      templateUrl: './app/login/login.html',
      data: {
        ignoreLogin: true
      }
    });
  });
}
