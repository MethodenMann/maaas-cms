import {Inject} from '../utils/di';
import {IArea} from '../areas/iarea';


export class PreviewView {
  public static selector = 'mas-preview-view';
  public static templateUrl = './app/preview/preview-view.html';

  private url = 'ionic-app/index.html';
  private frameWidth = 375;
  private frameHeight = 600;
  private areas: IArea[] = [];

  constructor(
    @Inject('$q') private $q,
    @Inject('PreviewService') private PreviewService,
    @Inject('Area') private Area,
    @Inject('Challenge') private Challenge,
    @Inject('Content') private Content
    ) {

    PreviewService.registerNavigateTo((data) => {
      if (data.type === 'area') {
        this.navigateToArea(data.id);
      }
    });

    this.$q.all([Content.findAll(), Challenge.findAll()]).then((values) => {
      this.Area.findAll().then((areas) => {
        this.areas = areas;
      });
    });
  }

  public navigateToArea(id) {
    this.url = 'ionic-app/#/app/area/' + id;
  }

  public navigateToContent(areaid, contentId) {
    this.url = `ionic-app/#/app/area/${areaid}/content/${contentId}`;
  }

  public navigateToChallenge(areaid, challengeId) {
    this.url = `ionic-app/#/app/quiz/${areaid}`;
  }
}

