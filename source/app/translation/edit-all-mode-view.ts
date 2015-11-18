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

  constructor(
    @Inject('$scope') private $scope
    ) {
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
