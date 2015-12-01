import {Inject} from '../utils/di';
import {FormView} from '../common/forms/form-view';
import {IMuseum} from './imuseum';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';

export abstract class DetailAbstract extends FormView {
  protected museum:IMuseum;

  constructor(@Inject('$scope') protected $scope,
              @Inject('$stateParams') protected $stateParams,
              @Inject('Museum') protected Museum,
              @Inject('Auth') protected Auth,
              @Inject('Invitation') protected Invitation,
              @Inject('$state') protected $state) {
    super($scope);

    this.loadData();
  }

  abstract saveHook():void;

  protected save() {
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    if (this.isFormValid()) {
      this.saveHook();
    } else {
      this.$scope.$broadcast('mas.saveprogess', 'rejected');
      this.focusFirstInputWithError();
    }
  }

  protected loadData():void {
  }
}
