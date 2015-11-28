import {Inject} from '../utils/di';
import {IArea} from '../areas/iarea';
import {AuthUtil} from '../common/auth-util-service';


export class PreviewView {
  public static selector = 'mas-preview-view';
  public static templateUrl = './app/preview/preview-view.html';

  private url = 'ionic-app/index.html';
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
    @Inject('AuthUtil') private AuthUtil
    ) {

    this.code = PreviewService.getCode();

    AuthUtil.getMuseumId().then( (museumId) => {
      parent.document['museumId'] = museumId;
    });


    this.$q.all([Content.findAll(), Challenge.findAll()]).then((values) => {
      this.Area.findAll().then((areas) => {
        this.areas = areas;
      });
    });
  }
}

