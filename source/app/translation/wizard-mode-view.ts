import {Inject} from '../utils/di';
import {Translatable} from './translatable';

export class WizardModeView {
  private static selector = 'mas-wizard-mode-view';
  private static templateUrl = './app/translation/wizard-mode-view.html';

  private static options = {
    bindToController: {
      translatables: '='
    }
  };

  private translatables:Array<Translatable>;
  private currentModelIndex:number = 0;

  constructor(
    @Inject('$scope') private $scope
    ) {

  }

  getTranslatable() {
    return this.translatables[this.currentModelIndex];
  }

  loadPreviousModel() {
    this.currentModelIndex = Math.max(0, --this.currentModelIndex);
  }

  loadNextModel() {
    this.currentModelIndex = Math.min(this.translatables.length - 1, ++this.currentModelIndex);
  }
}
