import {Inject} from '../utils/di';
import {IContent} from './icontent';

export class ContentButtonComponent {

  private static templateUrl = './app/contents/content-button-component.html';
  private static selector = 'mas-content-button';

  private static options = {
    bindToController: {
      content: '='
    }
  };

  private content: IContent;
}
