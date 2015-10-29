import {Inject} from '../utils/di';
import {IArea} from './IArea';

export class AreaButtonComponent {

  private static templateUrl = "./app/areas/area-button-component.html";
  private static selector = 'mas-area-button';

  private static options = {
    bindToController: {
      area: '='
    }
  };

  private area: IArea;
}
