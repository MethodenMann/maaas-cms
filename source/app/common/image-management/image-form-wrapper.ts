import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from './imedium-upload-broadcast';
import {IMedium} from '../../media/imedium';


export class ImageFormWrapper {
  private static templateUrl = 'app/common/image-management/image-form-wrapper.html';
  private static selector = 'mas-image-form-wrapper';

  private static options = {
    bindToController: {
      model: '=',
      imageId: '@',
      mediumableId: '@',
      mediumableType: '@',
      width: '@',
      height: '@',
      isRequired: '='
    }
  };



  private model: any;
  private imageId: string;
  //private width: string;
  //private height: string;
  //private element: JQuery;
  //private thumbnailTag: JQuery;
  //private uploadId: string;
  //private initialMediaId: string;
  //private publicId: string;
  //private isRequired: Boolean;

  constructor(
    @Inject('$scope') protected $scope
  ) {
    $scope.$on('image-management.injectImage', (e, data: IMediumUploadBroadcast) => {
      this.persistImageId(data.uploadId, data.mediumId);
    });

    $scope.$on('save', (e, data) => {
      this.saveImageRelation(data);
    });
  }


  protected persistImageId(uploadId:string, mediumId) {
    if (uploadId === this.imageId) {
      this.model = mediumId;
    }
  }


  protected saveImageRelation(data) {
    if (data.id && data.type) {
      var mediumableUpdateData = {
        id: this.model,
        mediumableId: data.id ,
        mediumableType: data.id
      };
      this.$scope.$broadcast('image-management.mediumableUpdate', mediumableUpdateData);
    }
  }


}
