import {Inject} from '../utils/di';
import {DetailAbstract} from './detail-abstract';
import {IMedium} from '../media/imedium';
import {IMuseum} from './imuseum';

export class DetailCreateView extends DetailAbstract {
  public static selector = 'mas-museums-detail-create-view';
  public static templateUrl = 'app/museums/detail-view.html';

  saveHook() {
      this.Museum.create({ museum: this.museum }).then((museum:IMuseum) => {
        this.$scope.$broadcast('save', {id: museum.id, type: 'Area'});
        this.$scope.$broadcast('mas.saveprogess', 'successfully');
        this.$state.go('cms.museums.detail.update', {museumId: museum.id});
      });
  }
}
