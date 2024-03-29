import {Inject} from '../utils/di';
import {DetailAbstract} from './detail-abstract';
import {IMedium} from '../media/imedium';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

export class CreateView extends DetailAbstract {
  constructorHook() {
    this.content.areaId = this.$stateParams.areaId;

    this.$scope.$on('image-management.imageUploaded', (e, data:IMediumUploadBroadcast) => {
      if (data.uploadId !== 'previewImage') {
        var medium = data.mediumId;
        this.addToImageList(medium);
      }
    });
  }

  saveHook() {
    this.Content.create({content: this.content}).then((content) => {
      var promises:Array<any> = [];
      for (let image of this.imageList) {
        var medium = image.medium;
        medium.mediumableId = content.id;
        medium.mediumableType = 'Content';
        promises.push(this.Medium.update(medium.id, {medium: medium}));
      }
      this.$q.all(promises).then(() => {
        this.$scope.$broadcast('save', {id: content.id, type: 'Content'});
        this.$scope.$broadcast('mas.saveprogess', 'successfully');
        this.$state.go('cms.areas.detail.contents.update', {contentId: content.id});
      });
    });
  }
}
