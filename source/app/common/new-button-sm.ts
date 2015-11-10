import {Inject} from '../utils/di';

export class NewButtonSmall {

  private static templateUrl = './app/common/new-button-sm.html';
  private static selector = 'mas-new-button-sm';

  private static options = {
    bindToController: {
      text: '@'
    }
  };

}
