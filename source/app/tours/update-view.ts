import {Inject} from '../utils/di';
import {AbstractDetailView} from './abstract-detail-view';
import {IMedium} from '../media/imedium';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {ITour} from './itour';

export class UpdateView extends AbstractDetailView {
  private static selector = 'mas-tour-update-view';
  constructorHook() {
  }

  save() {
    if (this.isFormValid()) {
      this.Tour.update(this.tour.id, { tour: this.tour });
      alert('Gespeichert'); //TODO: make sexy
    } else {
      this.focusFirstInputWithError();
    }
  }

  loadData() {
    var promis = this.Tour.find(this.$stateParams.tourId);

    promis.then((data) => {
      this.tour = data;
    });

    return promis;
  }

}
