import {Inject} from '../utils/di';
import {IArea} from './IArea';

export class CreateCtrl {

  private area: IArea;

  constructor(
    @Inject('$stateParams') private $stateParams,
    @Inject('Area') private Area
    ) {
  }

  saveArea() {
    this.Area.create({area: this.area});
  }
}
