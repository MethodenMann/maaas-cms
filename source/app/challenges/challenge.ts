import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {Multiplechoice} from './kind-configs/multiple-choice';
import {TrueFalse} from './kind-configs/true-false';
import {Assign} from './kind-configs/assign';
import {Order} from './kind-configs/order';

import {ListView} from './list-view';
import {CreateView} from './detail-create-view';
import {UpdateView} from './detail-update-view';
import {ChallengeButtonComponent} from './challenge-button-component';
import {TrueFalseQuestion} from './kind-configs/true-false-question';
import {ImageRegion} from './kind-configs/image-region';

export function loadChallenge(app) {
  var componentName = 'challenges';

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.directive(
    makeSelector(ChallengeButtonComponent),
    makeDirective(ChallengeButtonComponent));

  app.directive(
    makeSelector(Multiplechoice),
    makeDirective(Multiplechoice));

  app.directive(
    makeSelector(TrueFalse),
    makeDirective(TrueFalse));

  app.directive(
    makeSelector(TrueFalseQuestion),
    makeDirective(TrueFalseQuestion));

  app.directive(
    makeSelector(Assign),
    makeDirective(Assign));

  app.directive(
    makeSelector(Order),
    makeDirective(Order));

  app.directive(
    makeSelector(ImageRegion),
    makeDirective(ImageRegion));

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.areas.detail.${componentName}`,
        RouteUtil.getAbstractRoute(`/${componentName}`, ''))
      .state(`cms.areas.detail.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'Quiz', 'cms.areas.detail.update'))
      .state(`cms.areas.detail.${componentName}.create`,
        RouteUtil.getRoute(CreateView,
          'Quiz erstellen', `cms.areas.detail.${componentName}.list`, '/create'))
      .state(`cms.areas.detail.${componentName}.update`,
        RouteUtil.getRoute(UpdateView,
          'Quiz Bearbeiten', `cms.areas.detail.${componentName}.list`, '/{challengeId:[0-9]{1,8}}'));
  });
}
