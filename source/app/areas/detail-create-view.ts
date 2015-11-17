import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {DetailAbstract} from './detail-abstract';

export class DetailCreateView extends DetailAbstract {
  public static selector = 'mas-area-detail-create-view';
  public static templateUrl = './app/areas/detail-view.html';

  private createMode = true; //needed in view

  saveHook() {
    this.Area.create({area: this.area}).then((area:IArea) => {
      this.$scope.$broadcast('save', {id: area.id, type: 'Area'});
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
      this.AlertService.addAlert({ type: 'success',
                msg: this.$filter('translate')('areas_details_save_successfullyalert') });
      this.$state.go('cms.areas.detail.update', {areaId: area.id, created: true});
    });
  }
}
