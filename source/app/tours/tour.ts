import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {CreateView} from '../tours/create-view';
import {UpdateView} from '../tours/update-view';
import {ListView} from './list-view';

export function loadTour(app) {
  var componentName = 'tours';

  // app.directive(
  //   makeSelector(CreateView),
  //   makeDirective(CreateView));

  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
      RouteUtil.getAbstractRoute('/tours', 'Rundgänge'))
      .state(`cms.${componentName}.list`,
      RouteUtil.getRoute(ListView, 'Rundgänge'))
      .state(`cms.${componentName}.detail`,
      RouteUtil.getAbstractRoute(
        '/{tourId:[0-9]{1,8}}', 'Rundgänge', 'cms.tours.list'))
      .state(`cms.${componentName}.detail.update`,
      RouteUtil.getRoute(UpdateView,
        '{{ctrl.area.name}}', `cms.${componentName}.list`))
      .state(`cms.${componentName}.create`,
      RouteUtil.getRoute(CreateView,
        'Neuer Bereich', `cms.${componentName}.list`, '/create'));
  });
}