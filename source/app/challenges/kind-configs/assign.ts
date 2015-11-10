import {Inject} from '../../utils/di';
import {IMediumUploadBroadcast} from '../../common/image-management/imedium-upload-broadcast';
import {IMedium} from '../../media/imedium';

export class Assign {
  public static selector = 'mas-challenges-assign';
  public static templateUrl = './app/challenges/kind-configs/assign.html';

  private data: {
    listA: {
      kind:string,
      values:Array<{idx:number, value:string}>
    }
    listB: {
      kind:string,
      values:Array<{idx:number, mediumId:number, label:string}>
    }
  };

  private static options = {
    bindToController: {
      data: '='
    }
  };

  constructor(@Inject('$scope') protected $scope,
              @Inject('Medium') protected Medium) {
    if (!this.data.listA || this.data.listA.values === null) {
      this.data.listA = {kind: 'text', values: []};
      this.data.listB = {kind: 'image', values: []};
    }
  }

  addPair() {
    var idx = this.data.listA.values.length;
    this.data.listA.values.push({idx: idx, value: ''});
    this.data.listB.values.push({idx: idx, mediumId: undefined, label: ''});
  }

  private resetIndices() {
    for (let i = 0; i < this.data.listA.values.length; i++) {
      this.data.listA.values[i].idx = i;
      this.data.listB.values[i].idx = i;
    }
  }

  deletePair(index:number) {
    this.data.listA.values.splice(index, 1);
    this.data.listB.values.splice(index, 1);
    this.resetIndices();
  }
}
