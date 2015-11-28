import {Inject} from '../utils/di';
import {Translatable} from './translatable';

export class TranslationPanel {
  private static selector = 'mas-translation-panel';
  private static templateUrl = './app/translation/translation-panel.html';

  private static options = {
    bindToController: {
      translatable: '='
    }
  };

  private mainLanguage:string = 'de';
  private currentLanguage:string = 'en';
  private locales = ['en', 'it', 'fr'];

  private translatable:Translatable;

  constructor(
    @Inject('$scope') protected $scope
  ) {
  }

  getTranslatable() {
    return this.translatable;
  }
}
