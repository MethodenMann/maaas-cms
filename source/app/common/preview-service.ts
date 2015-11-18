import {Inject} from './../utils/di';
import {IAlert} from './ialert';


export class PreviewService {

  constructor(
    @Inject('PreviewSocket') protected previewSocket
    ) { }


  public publishPreview(type, id, data) {
    this.previewSocket.emit('publishPreview', {'type': type, 'id': id, 'data': data});
  }




}
