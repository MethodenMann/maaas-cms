import {Inject} from '../utils/di';

export class UiSrefActiveIf {
  private static selector = 'uiSrefActiveIf';

  private static options = {
    restrict: 'A'
  };

  private state;
  constructor(@Inject('$state') private $state) {
    this.state = $state;
  }


  private static link($scope, element:JQuery, $attrs) {
    var currentState = $attrs.uiSrefActiveIf;

    function update() {
      if ($scope.ctrl.state.includes(currentState) || $scope.ctrl.state.is(currentState)) {
        element.addClass('active');
      } else {
        element.removeClass('active');
      }
    }

    $scope.$on('$stateChangeSuccess', update);
    update();
  }

}
