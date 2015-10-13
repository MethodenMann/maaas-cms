import {Inject} from '../utils/di';
import {IArea} from './iarea';
import {DetailAbstract} from './detail-abstract';

export class DetailView extends DetailAbstract {
  private static selector = 'mas-area-detail-update-view';
  private static templateUrl = './app/area/detail-view.html';


  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area
    ) {
    super($scope, $stateParams, Area);
  }

  LoadData() {
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });
  }

  Save() {
    if (this.IsFormValid()) {
      this.Area.update(this.area.id, { area: this.area });
      alert('Gespeichert'); //TODO: make sexy
    } else {
      this.FocusFirstInputWithError();
    }
  }
}
