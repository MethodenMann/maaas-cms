import {makeDirective, makeSelector} from '../utils/component';
import {GetMasterRoute} from '../master/RouteHelper';

export function loadContent(app) {
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
