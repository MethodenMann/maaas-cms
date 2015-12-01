import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {CreateView} from '../contents/detail-create-view';
import {UpdateView} from '../contents/detail-update-view';
import {ListView} from './list-view';
import {ContentButtonComponent} from './content-button-component';

export function loadContent(app) {
  var componentName = 'contents';

  app.directive(
    makeSelector(ContentButtonComponent),
    makeDirective(ContentButtonComponent));


  app.config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.areas.detail.${componentName}`,
        RouteUtil.getAbstractRoute(`/${componentName}`))
      .state(`cms.areas.detail.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'Inhalte', 'cms.areas.detail.update'))
      .state(`cms.areas.detail.${componentName}.create`,
        RouteUtil.getRoute(CreateView,
          'Inhalt erstellen', `cms.areas.detail.${componentName}.list`, '/create'))
      .state(`cms.areas.detail.${componentName}.update`,
        RouteUtil.getRoute(UpdateView,
          'Inhalt bearbeiten', `cms.areas.detail.${componentName}.list`, '/{contentId:[0-9]{1,8}}'));
  });
}
