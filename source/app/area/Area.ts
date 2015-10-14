import {ListView} from './list-view';
import {DetailView} from './detail-update-view';
import {DetailCreateView} from './detail-create-view';

import {AreaButtonComponent} from './area-button-component';
import {makeDirective, makeSelector} from '../utils/component';
import {GetMasterRoute} from '../master/RouteHelper';

export function loadArea(app) {
  var componentName = 'area';

  app.directive(
    makeSelector(ListView),
    makeDirective(ListView));

  app.directive(
    makeSelector(DetailView),
    makeDirective(DetailView));

  app.directive(
    makeSelector(DetailCreateView),
    makeDirective(DetailCreateView));


  app.directive(
    makeSelector(AreaButtonComponent),
    makeDirective(AreaButtonComponent));


  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart(componentName);
  });



  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
     .state('cms.area', GetMasterRoute('area')
     )
     .state('cms.area.list', {
      url: '/list',
      template: '<mas-area-list-view/>',
      ncyBreadcrumb: {
        label: 'Bereich Übersicht'
      }
    })
      .state('cms.area.detail', {
      url: '/{areaId:[0-9]{1,8}}',
      template: '<mas-area-detail-update-view/>',
      ncyBreadcrumb: {
        label: 'Bereich Bearbeiten'
      }
    })
      .state('cms.area.create', {
      url: '/create',
      template: '<mas-area-detail-create-view/>',
      ncyBreadcrumb: {
        label: 'Neuer Bereich'
      }
    });
  });
}
