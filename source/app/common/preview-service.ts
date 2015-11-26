import {Inject} from './../utils/di';
import {IAlert} from './ialert';


export class PreviewService {
  private code:string;

  constructor(@Inject('PreviewSocket') protected previewSocket,
              @Inject('AuthUtil') protected AuthUtil,
              @Inject('$timeout') protected $timeout) {

    this.code = this.generateRandomCode(4);

    AuthUtil.getMuseumId().then((id) => {
      this.previewSocket.emit('setMuseum', {'museumId': id});
      this.previewSocket.emit('registerCode', {'museumId': id, 'code': this.code});
    });
  }

  public publishPreview(type, id, data) {
    this.previewSocket.emit('publishPreview', {'type': type, 'id': id, 'data': data});
  }

  public getCode() {
    return this.code;
  }

  private generateRandomCode(length:number) {
    var code = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return code;
  }
}
