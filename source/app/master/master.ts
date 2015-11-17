// import {app} from '../app';
import {MasterView} from './master-view';
import {WelcomeView} from './welcome-view';
import {RouteUtil} from './route-util';

export function loadMaster(app) {
  app.config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('master');
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/cms');

    $stateProvider
      .state('cms', RouteUtil.getRoute(MasterView, 'CMS', '', '/cms'))

      .state('cms.welcome', RouteUtil.getRoute(WelcomeView, 'Wilkommen', 'cms', '/welcome'));




  });

  //TODO: refactor in own component
  app.directive('uiSrefActiveIf', ['$state', function($state) {
    return {
      restrict: 'A',
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
  }]);



}
