import {Inject} from '../utils/di';
import {IArea} from '../areas/iarea';
import {FormView} from '../common/forms/form-view';
import {IChallenge} from './ichallenge';
import {DetailAbstract} from './detail-abstract';

export class CreateView extends DetailAbstract {

  public static selector = 'mas-challenge-create-view';
  public static templateUrl = './app/challenges/detail-view.html';



  protected constructorHook() {
    this.challenge.data = {};
    this.challenge.areaId = this.$stateParams.areaId;
  }


  saveHook() {
    this.Challenge.create({ challenge: this.challenge }).then((challenge:IChallenge) => {
      this.$scope.$broadcast('save', {id: challenge.id, type: 'Challenge'});
      this.$scope.$broadcast('challenge.saved', challenge);
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
      this.AlertService.addAlert({ type: 'success', msg: 'Das Quiz wurde erfolgreich erstellt!' });
      this.$state.go('cms.areas.detail.challenges.update', {challengeId: challenge.id});
    });
  }


}
