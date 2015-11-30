import {Inject} from '../utils/di';
import {Translatable} from './translatable';

export class EditAllModeView {
  private static selector = 'mas-edit-all-mode-view';
  private static templateUrl = './app/translation/edit-all-mode-view.html';

  private static options = {
    bindToController: {
      translatables: '='
    }
  };

  private translatables:Array<Translatable>;
  private filteredTranslatables:Array<Translatable>;
  private query:string;

  constructor(
    @Inject('$scope') private $scope
    ) {
    this.updateFilteredTranslatables();
  }

  updateFilteredTranslatables() {
    this.filteredTranslatables = [];
    if (this.query && this.query.trim() !== '') {
      for (let translatable of this.translatables) {
        // TODO solve this with polymorphism
        if ((translatable.model.name && translatable.model.name.indexOf(this.query) > -1) ||
            (translatable.model.title && translatable.model.title.indexOf(this.query) > -1)) {
          this.filteredTranslatables.push(translatable);
        }

        if (this.filteredTranslatables.length > 5) {
          return;
        }
      }
    }
  }

  save(translatable:Translatable) {
    this.$scope.$broadcast('mas.saveprogess', 'in-progress');
    var payload = {};
    payload[translatable.modelConfig.name] = translatable.model;
    // TODO get this from a service or something
    payload['locale'] = 'de';
    translatable.modelConfig.modelType.update(translatable.model.id, payload).then(() => {
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
    });
    this.$scope.$emit('mas.request-translation-progress-update');
  }
}
