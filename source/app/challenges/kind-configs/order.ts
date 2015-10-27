import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from '../../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../../media/imedium';

export class Order {
  public static selector = 'mas-challenges-order';
  public static templateUrl = './app/challenges/kind-configs/order.html';

  private static options = {
    bindToController: {
      data: '='
    }
  };

  private data: {
    question:string,
    kind:string,
    list:Array<{idx:number, captionShort:string, captionLong:string, mediumId:number}>
  };

  private options:any;

  constructor(@Inject('$scope') protected $scope,
              @Inject('Medium') protected Medium) {
    this.options = {
      placeholder: 'mas-challenge-order-entry',
      stop: () => {
        this.resetIndices();
      }
    }
    if(!this.data.list) {
      this.data.list = [];
    }
  }

  addEntry() {
    this.data.list.push({idx: this.data.list.length, captionShort: undefined, captionLong: undefined, mediumId: undefined})
  }

  private resetIndices() {
    for (let i = 0; i < this.data.list.length; i++) {
      this.data.list[i].idx = i;
    }
  }

  deleteEntry(index:number) {
    this.data.list.splice(index, 1);
    this.resetIndices();
  }
}
