import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {KindConfigLoader} from './kind-config-loader-component';
import {Multiplechoice} from './kind-configs/multiple-choice';
import {TrueFalse} from './kind-configs/true-false';

import {ListView} from './list-view';
import {CreateView} from './detail-create-view';
import {UpdateView} from './detail-update-view';
import {ChallengeButtonComponent} from './challenge-button-component';
import {TrueFalseQuestion} from './kind-configs/true-false-question';

export function loadChallenge(app) {
  var componentName = 'challenges';

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.directive(
    makeSelector(ChallengeButtonComponent),
    makeDirective(ChallengeButtonComponent));

  app.directive(
    makeSelector(KindConfigLoader),
    makeDirective(KindConfigLoader));

  app.directive(
    makeSelector(Multiplechoice),
    makeDirective(Multiplechoice));

  app.directive(
    makeSelector(TrueFalse),
    makeDirective(TrueFalse));

  app.directive(
    makeSelector(TrueFalseQuestion),
    makeDirective(TrueFalseQuestion));

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.areas.detail.${componentName}`,
        RouteUtil.getAbstractRoute(`/${componentName}`, 'QuizzeZZ'))
      .state(`cms.areas.detail.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'Challenge', 'cms.areas.detail.update'))
      .state(`cms.areas.detail.${componentName}.create`,
        RouteUtil.getRoute(CreateView,
          'Quiz erstellen', `cms.areas.detail.${componentName}.list`, '/create'))
      .state(`cms.areas.detail.${componentName}.update`,
        RouteUtil.getRoute(UpdateView,
          'Quiz Bearbeiten', `cms.areas.detail.${componentName}.list`, '/{challengeId:[0-9]{1,8}}'));
  });
}
