import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {FormView} from '../common/forms/form-view';

export abstract class DetailAbstract extends FormView {
  protected area:IArea;

  constructor(@Inject('$scope') protected $scope,
              @Inject('$stateParams') protected $stateParams,
              @Inject('Area') protected Area,
              @Inject('$state') protected $state,
              @Inject('AlertService') protected AlertService,
              @Inject('$filter') protected $filter,
              @Inject('$timeout') protected $timeout,
              @Inject('PreviewService') protected PreviewService) {
    super($scope);
    this.loadData();

    this.regististerDebouncewWatch($timeout, 'ctrl.area', this.publishPreview);
  }


  protected loadData():void {
  }

  abstract saveHook():void;


  protected publishPreview() {
    this.PreviewService.publishPreview('area', this.area);
  }

  protected save() {
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    if (this.isFormValid()) {
      this.saveHook();
    } else {
      this.$scope.$broadcast('mas.saveprogess', 'rejected');
      this.focusFirstInputWithError();
    }
  }
}
