import {ListView} from './list-view';
import {PercentageRibbon} from './percentage-ribbon';
import {WizardModeView} from './wizard-mode-view';
import {DynamicInputComponent} from './dynamic-input-component';
import {TranslationPanel} from './translation-panel';
import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';

export function loadTranslations(app) {
  var componentName = 'translations';

  app.directive(
    makeSelector(ListView),
    makeDirective(ListView));

  app.directive(
    makeSelector(TranslationPanel),
    makeDirective(TranslationPanel));

  app.directive(
    makeSelector(PercentageRibbon),
    makeDirective(PercentageRibbon));

  app.directive(
    makeSelector(WizardModeView),
    makeDirective(WizardModeView));

  app.directive(
    makeSelector(DynamicInputComponent),
    makeDirective(DynamicInputComponent));

  // app.config(function($translateProvider, $translatePartialLoaderProvider) {
  //   $translatePartialLoaderProvider.addPart(componentName);
  // });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
        RouteUtil.getAbstractRoute('/translations', 'translations'))
      .state(`cms.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'translations'));
  });
}
