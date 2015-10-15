import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';

import {ListView} from './list-view';

export function loadQuiz(app) {
  var componentName = 'quiz';

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.areas.detail.quiz`,
      {
        url: '/quiz',
        controller: ListView,
        controllerAs: 'ctrl',
        templateUrl: ListView.templateUrl,
        ncyBreadcrumb: {
          label: 'Quizzer',
          parent: 'cms.areas.detail.update'
        }
      });
  });
}
