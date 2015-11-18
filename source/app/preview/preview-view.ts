import {Inject} from '../utils/di';


export class PreviewView {
  public static selector = 'mas-preview-view';
  public static templateUrl = './app/preview/preview-view.html';

  private url = "ionic-app/index.html"

  constructor(
    @Inject('PreviewSocket') private PreviewSocket
    ) {

    PreviewSocket.on('navigateTo', (data) => {
      if (data.type === 'area') {
          this.url = 'ionic-app/#/app/area/' + data.id
      }
    });

  }
}
