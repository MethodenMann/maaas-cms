import {Inject} from '../utils/di';
import {DetailAbstract} from './detail-abstract';
import {IMedium} from '../media/imedium';
import {IMuseum} from "./imuseum";

export class DetailCreateView extends DetailAbstract {
  public static selector = 'mas-museums-detail-create-view';
  public static templateUrl = 'app/museums/detail-view.html';

  save() {
    if (this.isFormValid()) {
      this.Museum.create({ museum: this.museum }).then((museum:IMuseum) => {
        //this.saveImageRelation(museum.imageId, museum.id);

        alert('Gespeichert'); //TODO: make sexy
        this.$state.go("cms.museums.detail.update", {museumId: museum.id});
      });
    } else {
      this.focusFirstInputWithError();
    }
  }
}
