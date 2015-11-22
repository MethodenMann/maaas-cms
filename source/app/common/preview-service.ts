import {Inject} from './../utils/di';
import {IAlert} from './ialert';


export class PreviewService {

  constructor(
    @Inject('PreviewSocket') protected previewSocket,
    @Inject('AuthUtil') protected AuthUtil,
    @Inject('$timeout') protected $timeout
    ) {


    AuthUtil.getMuseumId().then( (id) => {
      this.previewSocket.emit('setMuseum', {'museumId': id});
    });

    this.previewSocket.on('navigateTo', (data) => {
      this.navigateToCallbacks.forEach((cb) => {
        cb(data);
      });
    });

  }

  public publishPreview(type, id, data) {
    this.previewSocket.emit('publishPreview', {'type': type, 'id': id, 'data': data});


  }

  private navigateToCallbacks = [];

  public registerNavigateTo(callback) {
    this.navigateToCallbacks.push(callback);
  }




}
