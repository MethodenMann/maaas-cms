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


  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });


  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`, RouteUtil.GetMasterRoute('areas', 'Bereiche'))
      .state(`cms.${componentName}.list`, RouteUtil.GetRoute(ListView, 'Bereiche'))
      .state(`cms.${componentName}.detail`, RouteUtil.GetRoute(DetailUpdateView, 'Bereich {{ctrl.area.name}} Bearbeiten', `cms.${componentName}.list`, '/{areaId:[0-9]{1,8}}'))
      .state(`cms.${componentName}.create`, RouteUtil.GetRoute(DetailCreateView, 'Neuer Bereich', `cms.${componentName}.list`, '/create'))
  });
}
