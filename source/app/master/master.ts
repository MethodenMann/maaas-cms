// import {app} from '../app';
import {MasterView} from './master-view';
import {WelcomeView} from './welcome-view';
import {RouteUtil} from './route-util';
import {UiSrefActiveIf} from './ui-sref-active-if';
import {makeDirective, makeSelector} from '../utils/component';

export function loadMaster(app) {
  app.config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('master');
  });

  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/cms');

    $stateProvider
      .state('cms', RouteUtil.getRoute(MasterView, 'CMS', '', '/cms'))
      .state('cms.welcome', RouteUtil.getRoute(WelcomeView, 'Wilkommen', 'cms', '/welcome'));
  });


  app.directive(makeSelector(UiSrefActiveIf), makeDirective(UiSrefActiveIf) );



}
