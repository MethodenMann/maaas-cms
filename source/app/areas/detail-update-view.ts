import {Inject} from '../utils/di';
import {IArea} from './iarea';
import {DetailAbstract} from './detail-abstract';

export class DetailUpdateView extends DetailAbstract {
  public static selector = 'mas-area-detail-update-view';
  public static templateUrl = './app/areas/detail-view.html';


  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area
    ) {
    super($scope, $stateParams, Area);
  }

  loadData() {
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });
  }

  save() {
    if (this.isFormValid()) {
      this.Area.update(this.area.id, { area: this.area });
      alert('Gespeichert'); //TODO: make sexy
    } else {
      this.focusFirstInputWithError();
    }
  }
}
