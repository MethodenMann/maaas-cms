import {ListView} from './list-view';
import {DetailUpdateView} from './detail-update-view';
import {DetailCreateView} from './detail-create-view';
import {AreaButtonComponent} from './area-button-component';
import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';

export function loadArea(app) {
  var componentName = 'areas';

  app.directive(
    makeSelector(AreaButtonComponent),
    makeDirective(AreaButtonComponent));

  app.config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
        RouteUtil.getAbstractRoute('/areas', 'Bereiche'))
      .state(`cms.${componentName}.list`,
        RouteUtil.getRoute(ListView, 'Bereiche'))
      .state(`cms.${componentName}.detail`,
        RouteUtil.getAbstractRoute(
          '/{areaId:[0-9]{1,8}}', 'Bereiche', 'cms.areas.list'))
      .state(`cms.${componentName}.detail.update`,
        RouteUtil.getRoute(DetailUpdateView,
          '{{ctrl.area.name}}', `cms.${componentName}.list`))
      .state(`cms.${componentName}.create`,
        RouteUtil.getRoute(DetailCreateView,
          'Neuer Bereich', `cms.${componentName}.list`, '/create'));
  });
}
