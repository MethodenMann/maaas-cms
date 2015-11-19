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
    this.save();
  }

  loadNextModel() {
    this.currentModelIndex = Math.min(this.translatables.length - 1, ++this.currentModelIndex);
    this.save();
  }

  save() {
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    var payload = {};
    var translatable = this.getTranslatable();
    payload[translatable.modelConfig.name] = translatable.model;
    // TODO get this from a service or something
    payload['locale'] = 'de';
    translatable.modelConfig.modelType.update(translatable.model.id, payload).then(() => {
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
    });
    this.$scope.$emit('mas.request-translation-progress-update');
  }
}
