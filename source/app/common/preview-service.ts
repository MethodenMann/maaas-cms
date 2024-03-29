import {Inject} from './../utils/di';
import {IAlert} from './ialert';


export class PreviewService {
  private code:string;

  constructor(@Inject('PreviewSocket') protected previewSocket,
              @Inject('Auth') protected Auth,
              @Inject('$http') protected $http,
              @Inject('BACKEND_BASEURL') protected BACKEND_BASEURL,
              @Inject('$timeout') protected $timeout) {

    this.code = this.generateRandomCode(4);

    Auth.currentUser().then((user) => {
      this.previewSocket.emit('setUserSession', {'userId': user.id});
      this.previewSocket.emit('registerCode', {'userId': user.id, 'code': this.code});
    });
  }

  public publishPreview(type, data) {
    this.$http.post(`${this.BACKEND_BASEURL}/preview/${type}`, {data: data}, {}).then(converted => {
      this.previewSocket.emit('publishPreview', {'type': type, 'obj': converted.data[0]});
      console.log('publishPreview', {'type': type, 'obj': converted.data[0]});
    });
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
