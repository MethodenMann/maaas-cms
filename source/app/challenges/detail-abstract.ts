import {Inject} from '../utils/di';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../media/imedium';
import {FormView} from '../common/forms/form-view';
import {IChallenge} from './ichallenge';
import {IArea} from '../areas/iarea';

export abstract class DetailAbstract extends FormView {
  protected area:IArea;
  protected challenge:IChallenge = <IChallenge>{};
  protected form;
  protected selectedKind;


  protected kinds =
    [
      {name: 'Multiplechoice', id: 'multiple-choice', url: 'app/challenges/dummies/multiple-choice.html'},
      {name: 'Wahr/Falsch', id: 'true-false', url: 'app/challenges/dummies/true-false.html'},
      {name: 'Zuordnen', id: 'assign', url: 'app/challenges/dummies/assign.html'},
      {name: 'Ordnen', id: 'order', url: 'app/challenges/dummies/order.html'},
      {name: 'Bildbereich', id: 'image-region', url: 'app/challenges/dummies/image-region.html'}
    ];

  constructor(@Inject('$scope') protected $scope,
              @Inject('$stateParams') protected $stateParams,
              @Inject('$state') protected $state,
              @Inject('Area') protected Area,
              @Inject('Challenge') protected Challenge,
              @Inject('$timeout') protected $timeout,
              @Inject('AlertService') protected AlertService,
              @Inject('PreviewService') protected PreviewService) {
    super($scope);

    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });
    this.loadData();
    this.constructorHook();

    this.regististerDebouncewWatch($timeout, 'ctrl.challenge', this.publishPreview);
  }

  private publishPreview() {
    this.PreviewService.publishPreview('challenge', this.challenge.id, this.challenge);
  }

  protected kindChange() {
    this.challenge.data = {};
    this.challenge.kind = this.selectedKind.id;
  }

  protected constructorHook() {
  }

  protected loadData():void {
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
}
