import {Inject} from './../utils/di';
import {IAlert} from './ialert';


export class PreviewService {

  constructor(
    @Inject('PreviewSocket') protected previewSocket,
    @Inject('Auth') protected Auth,
    @Inject('$timeout') protected $timeout
    ) {

    this.previewSocket.emit('setMuseum', {'museumId': 1});

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
