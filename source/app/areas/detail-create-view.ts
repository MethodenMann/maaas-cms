import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {DetailAbstract} from './detail-abstract';

export class DetailCreateView extends DetailAbstract {
  public static selector = 'mas-area-detail-create-view';
  public static templateUrl = './app/areas/detail-view.html';

  private createMode = true;

  save() {
    if (this.isFormValid()) {
      this.Area.create({ area: this.area }).then((area:IArea) => {
        this.$scope.$broadcast('save', {id: area.id, type: 'Area'});
        alert('Gespeichert'); //TODO: make sexy
        this.$state.go('cms.areas.detail.update', {areaId: area.id});
      });
    } else {
      this.focusFirstInputWithError();
    }
  }
}
