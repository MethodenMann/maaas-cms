import {Inject} from '../utils/di';
import {IChallenge} from './ichallenge';
import {IArea} from '../areas/iarea';
import {FormView} from '../common/forms/form-view';
import {DetailAbstract} from './detail-abstract';

export class UpdateView extends DetailAbstract {
  public static selector = 'mas-challenge-update-view';
  public static templateUrl = './app/challenges/detail-view.html';
  private disableKindSelect = true;

  protected loadData() {
    this.Challenge.find(this.$stateParams.challengeId).then((data) => {
      this.challenge = data;
      this.setKind();
      this.publishPreview();
    });
  }

  private setKind() {
    this.kinds.forEach((kind) => {
      if (kind.id === this.challenge.kind) {
        this.selectedKind = kind;
      }
    });
  }

  saveHook() {
    this.Challenge.update(this.challenge.id, {challenge: this.challenge}).then((challenge) => {
      this.$scope.$broadcast('save', {id: challenge.id, type: 'Challenge'});
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
    });
  }
}
