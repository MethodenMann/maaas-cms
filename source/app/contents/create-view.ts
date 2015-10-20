import {Inject} from '../utils/di';
import {AbstractDetailView} from './abstract-detail-view';
import {IMedium} from '../media/imedium';

export class CreateView extends AbstractDetailView {
  constructorHook() {
    this.content.areaId = this.$stateParams.areaId;
  }

  save() {
    this.Content.create({content: this.content});
  }
}
