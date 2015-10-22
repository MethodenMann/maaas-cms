import {Inject} from '../utils/di';
import {IArea} from '../areas/iarea';
import {FormView} from '../common/forms/form-view';
import {IChallenge} from "./ichallenge";
import {DetailAbstract} from "./detail-abstract";

export class CreateView extends DetailAbstract {

  public static selector = 'mas-challenge-create-view';
  public static templateUrl = './app/challenges/detail-view.html';



  protected constructorHook() {
    console.log("huug 123")
    this.challenge.data = {};
    this.challenge.areaId = this.$stateParams.areaId;
  }



  save() {
    if (this.isFormValid()) {
      this.Challenge.create({ challenge: this.challenge }).then((challenge:IChallenge) => {
        alert('Erstellt'); //TODO: make sexy
        this.$scope.$broadcast('challenge.saved', challenge);
        this.$state.go("cms.areas.detail.challenges.update", {challengeId: challenge.id});
      });
    } else {
      this.focusFirstInputWithError();
    }
  }
}
