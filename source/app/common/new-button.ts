import {Inject} from '../utils/di';

export class NewButton {

  private static templateUrl = './app/common/new-button.html';
  private static selector = 'mas-new-button';

  private static options = {
    bindToController: {
      ref: '@',
      text: '@'
    }
  };

}
