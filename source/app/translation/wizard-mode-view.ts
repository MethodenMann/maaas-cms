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

  private currentTranslatable:Translatable;

  private translationNotCompleteMessage:string = '';

  constructor(
    @Inject('$scope') private $scope
    ) {
    this.loadNextModel();
  }

  getTranslatable() {
    return this.currentTranslatable;
  }

  loadNextModel() {
    for (let translatable of this.translatables) {
      if (translatable.getTranslationProgress()[0] !== 1) {
        if (this.currentTranslatable === translatable) {
          this.translationNotCompleteMessage = 'Dieser Inhalt ist noch nicht vollständig übersetzt!';
        } else {
          this.translationNotCompleteMessage = '';
          this.$scope.$broadcast('translation.changeCurrentLanguage', 'en');
        }
        this.currentTranslatable = translatable;
        this.save();
        return;
      }
    }
    this.save();
    this.currentTranslatable = undefined;
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
