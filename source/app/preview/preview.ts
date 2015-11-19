import {RouteUtil} from '../master/route-util';
import {PreviewView} from './preview-view';

export function loadPreview(app) {

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('preview', {
        url: '/preview',
        templateUrl: './app/preview/preview-view.html',
        controller: PreviewView,
        controllerAs: 'ctrl'
      });
  });
}
