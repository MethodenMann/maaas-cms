import {Inject} from '../utils/di';
import {ITour} from './itour';

export class TourButtonComponent {
  private static templateUrl = './app/tours/tour-button-component.html';
  private static selector = 'mas-tour-button';

  private tour: ITour;

  constructor(@Inject('$scope') private $scope) {
  }

  private static options = {
    bindToController: {
      tour: '='
    }
  };
}
