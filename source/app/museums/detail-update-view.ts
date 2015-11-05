import {Inject} from '../utils/di';
import {DetailAbstract} from './detail-abstract';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

export class DetailUpdateView extends DetailAbstract {
  public static selector = 'mas-museums-detail-update-view';
  public static templateUrl = 'app/museums/detail-view.html';

  protected constructorHook() {
    this.$scope.$on('image-management.imageUploaded', (e, data: IMediumUploadBroadcast) => {
      this.persistImageId(data.uploadId, data.mediumId);
    });
  }

  loadData() {
    this.Museum.find(this.$stateParams.museumId).then((data) => {
      this.museum = data;
    });
  }

  save() {
    //send in progress
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    if (this.isFormValid()) {
      this.Museum.update(this.museum.id, { museum: this.museum }).then( () =>{
        this.$scope.$broadcast('mas.saveprogess', 'successfully');
      });
    } else {
      this.$scope.$broadcast('mas.saveprogess', 'rejected');
      this.focusFirstInputWithError();
    }

  }


}
