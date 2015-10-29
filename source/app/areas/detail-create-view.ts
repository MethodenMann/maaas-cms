import {Inject} from '../utils/di';
import {IArea} from './IArea';
import {DetailAbstract} from './detail-abstract';
import {IMedium} from '../media/imedium';

export class DetailCreateView extends DetailAbstract {
  public static selector = 'mas-area-detail-create-view';
  public static templateUrl = './app/areas/detail-view.html';

  save() {
    if (this.isFormValid()) {
      this.Area.create({ area: this.area }).then((area:IArea) => {
        this.saveImageRelation(area.backgroundImage, area.id);
        this.saveImageRelation(area.stickerImage, area.id);
        alert('Gespeichert'); //TODO: make sexy
        this.$state.go('cms.areas.detail.update', {areaId: area.id});
      });
    } else {
      this.focusFirstInputWithError();
    }
  }
}
