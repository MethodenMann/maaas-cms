import {Inject} from '../utils/di';
import {AbstractDetailView} from './abstract-detail-view';
import {IMedium} from '../media/imedium';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {ITour} from "./itour";
import {IArea} from "../areas/iarea";

export class CreateView extends AbstractDetailView {
  constructorHook() {
  }

  save() {
    if (this.isFormValid()) {
      this.Tour.create({ tour: this.tour }).then((tour:ITour) => {
        alert('Gespeichert'); //TODO: make sexy
        this.$state.go("cms.tours.detail.update", {tourId: tour.id});
      });
    } else {
      this.focusFirstInputWithError();
    }

  }


  loadData() {
    this.tour = <ITour>{
      selectedContents: [],
      selectedChallenges:[]
    };
  }
}
