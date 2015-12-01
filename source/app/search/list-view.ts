import {Inject} from '../utils/di';

import {IContent} from '../contents/icontent';
import {IChallenge} from '../challenges/ichallenge';
import {ITour} from '../tours/itour';
import {IArea} from '../areas/iarea';

export class ListView {
  public static selector = 'mas-area-list-view';
  public static templateUrl = './app/search/list-view.html';

  private areas:IArea[] = [];
  private contents:IContent[] = [];
  private challenges:IChallenge[] = [];
  private tours:ITour[] = [];

  private searchText:string;

  constructor(@Inject('Area') private Area,
              @Inject('Content') private Content,
              @Inject('Challenge') private Challenge,
              @Inject('Tour') private Tour,
              @Inject('$scope') private $scope,
              @Inject('Medium') private Medium) {

    $scope.$on('mas.search', (e, text) => this.searchText = text);


    Medium.findAll().then((data) => {
      Area.findAll().then((data) => {
        this.areas = data;
      });

      Content.findAll().then((data) => {
        this.contents = data;
      });

      Challenge.findAll().then((data) => {
        this.challenges = data;
      });

      Tour.findAll().then((data) => {
        this.tours = data;
      });
    });
  }


}
