import {Inject} from '../utils/di';
import {AbstractDetailView} from './abstract-detail-view';
import {IMedium} from '../media/imedium';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {ITour} from './itour';

export class UpdateView extends AbstractDetailView {

  saveHook() {
    this.Tour.update(this.tour.id, {tour: this.tour}).then((tour:ITour) => {
      this.$scope.$broadcast('save', {id: tour.id, type: 'Tour'});
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
    });

  }

  loadData() {
    var promis = this.Tour.find(this.$stateParams.tourId);

    promis.then((data) => {
      this.tour = data;
    });

    return promis;
  }
}
