import {Inject} from '../utils/di';
import {IArea} from './iarea';
import {DetailAbstract} from './detail-abstract';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

export class DetailUpdateView extends DetailAbstract {
  public static selector = 'mas-area-detail-update-view';
  public static templateUrl = './app/areas/detail-view.html';


  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Area') protected Area,
    @Inject('Medium') protected Medium
    ) {
    super($scope, $stateParams, Area, Medium);
  }

  loadData() {
    this.Medium.findAll().then((data) => {
      this.Area.find(this.$stateParams.areaId).then((data) => {
        this.area = data;
        var bdata: IMediumUploadBroadcast = {uploadId: "backgroundImage", medium: this.area.backgroundImage};
        this.$scope.$broadcast('imageUploaded', bdata);
        var bdata: IMediumUploadBroadcast = {uploadId: "stickerImage", medium: this.area.stickerImage};
        this.$scope.$broadcast('imageUploaded', bdata);
      });
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
