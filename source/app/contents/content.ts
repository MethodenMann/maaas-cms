import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {TinyMceComponent} from './tiny-mce-component';
import {ContentDetailComponent} from './content-detail-component';

export function loadContent(app) {
  var componentName = 'contents';

  app.directive(
    makeSelector(TinyMceComponent),
    makeDirective(TinyMceComponent));

    app.directive(
      makeSelector(ContentDetailComponent),
      makeDirective(ContentDetailComponent));

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
        RouteUtil.getAbstractRoute('/contents', 'Inhalte'))
      .state(`cms.${componentName}.list`,
        RouteUtil.getRoute(ContentDetailComponent, 'Bereiche'))
      .state(`cms.${componentName}.detail`,
        RouteUtil.getRoute(ContentDetailComponent,
          'Bereich {{ctrl.area.name}} Bearbeiten',
          `cms.${componentName}.list`,
          '/{id:[0-9]{1,8}}'));
  });
}
