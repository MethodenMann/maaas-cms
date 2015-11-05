import {Inject} from '../utils/di';
import {AbstractDetailView} from './abstract-detail-view';
import {IMedium} from '../media/imedium';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';
import {ITour} from './itour';
import {IArea} from '../areas/iarea';

export class CreateView extends AbstractDetailView {


  saveHook() {
      this.Tour.create({ tour: this.tour }).then((tour:ITour) => {
        this.$scope.$broadcast('save', {id: tour.id, type: 'Tour'});
        this.$scope.$broadcast('mas.saveprogess', 'successfully');
        this.$state.go('cms.tours.detail.update', {tourId: tour.id});
      });
  }


  loadData() {
    this.tour = <ITour>{
      selectedContents: [],
      selectedChallenges:[]
    };

    return this.$q.when();
  }
}
