import {Inject} from '../utils/di';
import {IArea} from './iarea';
import {DetailAbstract} from './detail-abstract';

export class DetailUpdateView extends DetailAbstract {
  public static selector = 'mas-area-detail-update-view';
  public static templateUrl = './app/areas/detail-view.html';

  loadData() {
    this.Area.find(this.$stateParams.areaId).then((data) => {
      this.area = data;
      this.publishPreview();
    });
  }

  saveHook() {
    this.Area.update(this.area.id, {area: this.area}).then(() => {
      this.$scope.$broadcast('save', {id: this.area.id, type: 'Area'});
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
    });
  }
}
