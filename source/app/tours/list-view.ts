import {Inject} from '../utils/di';
import {ITour} from './itour';

export class ListView {
  public static selector = 'mas-tour-list-view';
  public static templateUrl = './app/tours/list-view.html';

  private tours: ITour[];

  constructor(
    @Inject('$stateParams') private $stateParams,
    @Inject('Tour') private Tour
    ) {
    Tour.findAll().then((data) => {
      this.tours = data;
    });
  }
}
