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
      {name: 'multiplechoice', id: 'multiple-choice', url: 'app/challenges/dummies/multiple-choice.html'},
      {name: 'True False', id: 'true-false', url: 'app/challenges/dummies/true-false.html'},
      {name: 'Assign', id: 'assign', url: 'app/challenges/dummies/assign.html'},
      {name: 'Order', id: 'order', url: 'app/challenges/dummies/order.html'}
    ];


  constructor(@Inject('$scope') protected $scope,
              @Inject('$stateParams') protected $stateParams,
              @Inject('$state') protected $state,
              @Inject('Area') protected Area,
              @Inject('Challenge') protected Challenge) {
    super($scope);

    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
    });
    this.loadData();
    this.constructorHook();
  }

  protected kindChange() {
    this.challenge.data = {};
    this.challenge.kind = this.selectedKind.id;
  }

  protected constructorHook() {
  }

  abstract save():void;

  protected loadData():void {
  }
}
