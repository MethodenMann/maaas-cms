import {Inject} from '../utils/di';
import {IArea} from './iarea';
import {DetailAbstract} from './detail-abstract';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

export class DetailUpdateView extends DetailAbstract {
  public static selector = 'mas-area-detail-update-view';
  public static templateUrl = './app/areas/detail-view.html';

  protected constructorHook() {
    this.$scope.$on('image-management.imageUploaded', (e, data: IMediumUploadBroadcast) => {
      this.persistImageId(data.uploadId, data.mediumId);
    });
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
