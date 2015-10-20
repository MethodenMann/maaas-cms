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
          var url = $.cloudinary.url(medium.publicId, {
            format: 'jpg', width: 100, height: 100, crop: 'thumb'
          });
          list.push({title: 'a', value: url, medium: medium});
        });
        this.imageList = list;
      });
    });

    this.$scope.$on('image-management.imageUploaded', (e, data: IMediumUploadBroadcast) => {
      var medium = data.medium;
      medium.mediumableId = this.content.id;
      medium.mediumableType = 'Content';
      this.Medium.update(medium.id, {medium: medium});
      var url = $.cloudinary.url(medium.publicId, {
        format: 'jpg', width: 100, height: 100, crop: 'thumb'
      });
      this.imageList.push({title: this.imageList.length, value: url, medium: medium});
    });
  }

  save() {
    this.Content.update(this.content.id, {content: this.content});
  }
}
