import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {DetailAbstract} from './detail-abstract';

export class DetailCreateView extends DetailAbstract {
  public static selector = 'mas-area-detail-create-view';
  public static templateUrl = './app/areas/detail-view.html';


  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area
    ) {
    super($scope, $stateParams, Area);
  }

  Save() {
    if (this.IsFormValid()) {
      this.Area.create({ area: this.area });
      alert('Gespeichert'); //TODO: make sexy
    } else {
      this.FocusFirstInputWithError();
    }
  }
}
