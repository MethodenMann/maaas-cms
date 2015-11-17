import {Inject} from '../utils/di';


export class PreviewView {
  public static selector = 'mas-preview-view';
  public static templateUrl = './app/preview/preview-view.html';

  private url = "ionic-app/index.html"

  constructor(
    @Inject('mySocket') private mySocket
    ) {



    mySocket.on('navigateTo', (data) => {
      if (data.type === 'area') {
        if (data.id === "Bär") {
          this.url = 'ionic-app/#/app/area/bear'
        }
        if (data.id === "Ameisen") {
          this.url = 'ionic-app/#/app/area/ant'
        }
      }
    }
    );

  }
}
