import {Inject} from '../utils/di';
import {AbstractDetailView} from './abstract-detail-view';
import {IMedium} from '../media/imedium';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

export class UpdateView extends AbstractDetailView {
  constructorHook() {
    // TODO fetch media differently
    this.Medium.findAll().then((data) => {
      this.Content.find(this.$stateParams.contentId).then((data) => {
        this.content = data;

        var list = [];
        this.content.media.forEach(medium => {
          var url = this.getCloudinaryUrl(medium);
          list.push({title: 'a', value: url, medium: medium});
        });
        this.imageList = list;
      });
    });

    this.$scope.$on('image-management.imageUploaded', (e, data: IMediumUploadBroadcast) => {
      if (data.uploadId != "previewImage") {
        var medium = {
          mediumId: data.mediumId,
          mediumableId: this.content.id,
          mediumableType: 'Content'
        };

        this.Medium.update(data.mediumId, {medium: medium});
        this.addToImageList(data.mediumId);
      }
    });

  }

  saveHook() {
    this.Content.update(this.content.id, {content: this.content}).then(() => {
      this.$scope.$broadcast('save', {id: this.area.id, type: 'Content'});
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
    });
  }
}
