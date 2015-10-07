import {Inject} from '../utils/di';
import {IArea} from './IArea';

export class AreaButtonDirective {

  private static templateUrl = 'app/area/views/areabutton.html';
  private static selector = 'area-button';

  private static options = {
    bindToController: {
      area: '='
    }
  };

  private area: IArea;

  //constructor() {  }

  // private static link($scope, element: JQuery, attributes) {
  //   $scope.ctrl.element = element;
  // }
}
