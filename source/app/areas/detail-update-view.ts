import {Inject} from '../utils/di';
import {IArea} from './iarea';
import {DetailAbstract} from './detail-abstract';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

export class DetailUpdateView extends DetailAbstract {
  public static selector = 'mas-area-detail-update-view';
  public static templateUrl = './app/areas/detail-view.html';

  protected constructorHook() {
    this.$scope.$on('image-management.imageUploaded', (e, data: IMediumUploadBroadcast) => {
      this.saveImageRelation(data.medium);
      this.handleImageDisplay(data.uploadId, data.medium);
    });
  }

  loadData() {
    this.Medium.findAll().then((data) => {
      this.Area.find(this.$stateParams.areaId).then((data) => {
        this.area = data;
        var bdata: IMediumUploadBroadcast = {uploadId: "backgroundImage", medium: this.area.backgroundImage};
        this.$scope.$broadcast('image-management.injectImage', bdata);
        var bdata: IMediumUploadBroadcast = {uploadId: "stickerImage", medium: this.area.stickerImage};
        this.$scope.$broadcast('image-management.injectImage', bdata);
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
