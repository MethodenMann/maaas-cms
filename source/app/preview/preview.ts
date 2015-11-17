import {RouteUtil} from '../master/route-util';
import {PreviewView} from './preview-view';

export function loadPreview(app) {

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('cms.preview', RouteUtil.getRoute(PreviewView, 'Vorschau', 'cms', '/preview'));
  });
}
