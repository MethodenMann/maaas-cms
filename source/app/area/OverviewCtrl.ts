import {Inject} from '../utils/di';
import {IArea} from './IArea';

export class OverviewCtrl {
  private areas: IArea[] = [];

  constructor(
    @Inject('$location') private $location,
    @Inject('Area') private Area
    ) {

    Area.findAll().then((data) => {
      this.areas = data;
    });
  }
}
