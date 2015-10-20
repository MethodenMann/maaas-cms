import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {TinyMceComponent} from './tiny-mce-component';
import {CreateView} from '../contents/create-view';
import {UpdateView} from '../contents/update-view';

export function loadContent(app) {
  var componentName = 'contents';

  app.directive(
    makeSelector(TinyMceComponent),
    makeDirective(TinyMceComponent));

  app.directive(
    makeSelector(CreateView),
    makeDirective(CreateView));

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
      RouteUtil.getAbstractRoute('/contents', 'Inhalte'))
      // .state(`cms.${componentName}.list`,
      // RouteUtil.getRoute(ListView, 'Inhalte'))
      // .state(`cms.${componentName}.detail`,
      // RouteUtil.getAbstractRoute(
      //   '/{contentId:[0-9]{1,8}}', 'Inhalte', 'cms.contents.list'))
      .state(`cms.${componentName}.detail.update`,
      RouteUtil.getRoute(UpdateView,
        '{{ctrl.content.name}}', `cms.${componentName}.list`))
      .state(`cms.${componentName}.create`,
      RouteUtil.getRoute(CreateView,
        'Neuer Inhalt', `cms.${componentName}.list`, '/create'));
  });
}
