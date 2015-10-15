// import {app} from '../app';
import {MasterView} from './master-view';
import {RouteUtil} from './route-util';

export function loadMaster(app) {
  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart("master");
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/cms');
    $stateProvider
      .state('cms', RouteUtil.GetRoute(MasterView, 'CMS', '', '/cms'))
  });

  //TODO: refactor in own component
  app.directive('uiSrefActiveIf', ['$state', function($state) {
    return {
      restrict: "A",
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        var state = $attrs.uiSrefActiveIf;

        function update() {
          if ($state.includes(state) || $state.is(state)) {
            $element.addClass('active');
          } else {
            $element.removeClass('active');
          }
        }

        $scope.$on('$stateChangeSuccess', update);
        update();
      }]
    };
  }])



}
