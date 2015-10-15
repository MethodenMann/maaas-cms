import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {QuizConfigLoader} from './quiz-config-loader';
import {Multiplechoice} from './types/multiple-choice';
import {TrueFalse} from './types/true-false';

import {ListView} from './list-view';
import {CreateView} from './create-view';

export function loadQuiz(app) {
  var componentName = 'quiz';

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app
    .directive(
    makeSelector(QuizConfigLoader),
    makeDirective(QuizConfigLoader))

  app
    .directive(
    makeSelector(Multiplechoice),
    makeDirective(Multiplechoice))


      app
        .directive(
        makeSelector(TrueFalse),
        makeDirective(TrueFalse))

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.areas.detail.quiz',
      RouteUtil.getAbstractRoute('/quiz', 'QuizzeZZ'))
      .state(`cms.areas.detail.quiz.list`,
      RouteUtil.getRoute(ListView, 'Quiz', 'cms.areas.detail.update'))
      .state(`cms.areas.detail.quiz.create`,
      RouteUtil.getRoute(CreateView,
        'Quiz erstellen', `cms.areas.detail.quiz.list`, '/create'));


  });
}
