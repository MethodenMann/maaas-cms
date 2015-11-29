//import {Inject} from '../../utils/di';
//
//export class BlurBroadcast {
//  private static selector = 'blur-broadcast';
//  private static template(element, attrs) {
//    var tag = element[0].nodeName;
//    return '<' + tag + ' data-ng-transclude data-ng-blur="ctrl.preview()"></' + tag + '>';
//  }
//
//  private static options = {
//    restrict: 'A',
//    transclude: true,
//    replace: true
//  };
//
//  private state;
//  constructor(@Inject('$scope') private $scope) {
//  }
//
//  public preview() {
//    this.$scope.$emit('maaas.blur');
//  }
//
//  private static link($scope, element:JQuery, $attrs) {
//  }
//
//}
