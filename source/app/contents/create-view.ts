import {Inject} from '../utils/di';
import {AbstractDetailView} from './abstract-detail-view';
import {IMedium} from '../media/imedium';

declare var tinyMCE: any;

export class CreateView extends AbstractDetailView {
  constructorHook() {
    this.content.areaId = this.$stateParams.areaId;
  }

  save() {
    this.content.data = tinyMCE.editors[0].getContent();
    this.Content.create({content: this.content});
  }
}
