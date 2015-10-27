import {Inject} from '../utils/di';
import {FormView} from '../common/forms/form-view';
import {IMuseum} from "./imuseum";
import {IMediumUploadBroadcast} from "../common/image-management/imedium-upload-broadcast";
import {IMedium} from "../media/imedium";

export abstract class DetailAbstract extends FormView {
  protected museum: IMuseum;

  constructor(
    @Inject('$scope') protected $scope,
    @Inject('$stateParams') protected $stateParams,
    @Inject('Museum') protected Museum,
    @Inject('$state') protected $state
    ) {
    super($scope);

    this.loadData();

    $scope.$on('image-management.injectImage', (e, data: IMediumUploadBroadcast) => {
      this.persistImageId(data.uploadId, data.mediumId);
    });

    this.constructorHook();
  }

  protected constructorHook() {}

  protected persistImageId(uploadId:string, mediumId) {
      this.museum[uploadId] = mediumId;
  }

  protected saveImageRelation(medium:IMedium, id?:number) {
    var mediumableUpdateData = {
      id: medium.id,
      mediumableId: id || this.museum.id,
      mediumableType: 'Museum'
    };
    this.$scope.$broadcast("image-management.mediumableUpdate", mediumableUpdateData)
  }


  abstract save(): void;
  protected loadData(): void { }
}
