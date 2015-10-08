import {makeDirective, makeSelector} from '../utils/component';
import {GetMasterRoute} from '../master/RouteHelper';
import {TinyMceComponent} from './TinyMceComponent';
import {ContentDetailComponent} from './ContentDetailComponent';

export function loadContent(app) {
  app.directive(
    makeSelector(TinyMceComponent),
    makeDirective(TinyMceComponent));

    app.directive(
      makeSelector(ContentDetailComponent),
      makeDirective(ContentDetailComponent));

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.content', GetMasterRoute('content')
    )
      .state('cms.content.overview', {
      url: '/content/overview',
      templateUrl: './app/content/editor.html'
    });
  });
}
