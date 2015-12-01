import {Inject} from '../utils/di';
import {IArea} from '../areas/iarea';


export class PreviewView {
  public static selector = 'mas-preview-view';
  public static templateUrl = './app/preview/preview-view.html';

  private url = '';
  private frameWidth = 375;
  private frameHeight = 600;
  private areas: IArea[] = [];

  private code :string = '';
  constructor(
    @Inject('$q') private $q,
    @Inject('PreviewService') private PreviewService,
    @Inject('Area') private Area,
    @Inject('Challenge') private Challenge,
    @Inject('Content') private Content,
    @Inject('Auth') private Auth
    ) {

    this.code = PreviewService.getCode();

    Auth.currentUser().then((user) => {
      var museumId = user.museum_id;
      parent.document['museumId'] = museumId;
      this.url = 'ionic-app/index.html';
    });


    this.$q.all([Content.findAll(), Challenge.findAll()]).then((values) => {
      this.Area.findAll().then((areas) => {
        this.areas = areas;
      });
    });
  }
}

