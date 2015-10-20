import {Inject} from '../utils/di';
import {AbstractDetailView} from './abstract-detail-view';
import {IMedium} from '../media/imedium';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

export class CreateView extends AbstractDetailView {
  constructorHook() {
    this.content.areaId = this.$stateParams.areaId;

    this.$scope.$on('image-management.imageUploaded', (e, data: IMediumUploadBroadcast) => {
      var medium = data.medium;
      this.addToImageList(medium);
    });
  }

  save() {
    this.Content.create({content: this.content}).then((content) => {
      for (let image of this.imageList) {
        var medium = image.medium;
        medium.mediumableId = content.id;
        medium.mediumableType = 'Content';
        this.Medium.update(medium.id, {medium: medium});
      }
    })
  }
}
