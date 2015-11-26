import {makeDirective, makeSelector} from '../utils/component';
import {RouteUtil} from '../master/route-util';
import {DetailCreateView} from './detail-create-view';
import {DetailUpdateView} from './detail-update-view';


export function loadMuseum(app) {
  var componentName = 'museums';

  app.config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });


  app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state(`cms.${componentName}`,
        RouteUtil.getAbstractRoute('/museums', 'Museum'))


      .state(`cms.${componentName}.detail`,
        RouteUtil.getAbstractRoute(
          '/{museumId:[0-9]{1,8}}', 'Bereiche'))



      .state(`cms.${componentName}.detail.update`,
        RouteUtil.getRoute(DetailUpdateView,
          'Bearbeiten', `cms.${componentName}`))


      .state(`cms.${componentName}.create`,
        RouteUtil.getRoute(DetailCreateView,
          'Neues Museum', `cms.${componentName}`, '/create'));
  });
}
