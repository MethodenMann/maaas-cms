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
      .state(`cms.${componentName}`, RouteUtil.GetMasterRoute('contents', 'Inhalte'))
      .state(`cms.${componentName}.list`, RouteUtil.GetRoute(ContentDetailComponent, 'Bereiche'))
      .state(`cms.${componentName}.detail`,
        RouteUtil.GetRoute(ContentDetailComponent,
          'Bereich {{ctrl.area.name}} Bearbeiten',
          `cms.${componentName}.list`,
          '/{id:[0-9]{1,8}}'))
      // .state(`cms.${componentName}.create`, RouteUtil.GetRoute(DetailCreateView, 'Neuer Bereich', `cms.${componentName}.list`, '/create'))
  });

  // app.config(function($stateProvider, $urlRouterProvider) {
  //   $stateProvider
  //     .state('cms.content', RouteUtil.GetMasterRoute('content', 'Inhalt')
  //   )
  //     .state('cms.content.overview', {
  //     url: '/overview',
  //     template: '<mas-content-detail-component></mas-content-detail-component>'
  //   })
  //     .state('cms.content.detail', {
  //     url: '/{contentId:[0-9]{1,8}}',
  //     template: '<mas-content-detail-component></mas-content-detail-component>'
  //   })
  //     .state('cms.content.create', {
  //     url: '/create',
  //     templateUrl: './app/content/views/detail.html',
  //     controller: 'ContentCreateCtrl',
  //     controllerAs: 'ctrl'
  //   });
    // $stateProvider
    //   .state('cms.content', GetMasterRoute('content')
    // )
    //   .state('cms.content.overview', {
    //   url: '/content/overview',
    //   templateUrl: './app/content/editor.html'
    // });
  // });
}
