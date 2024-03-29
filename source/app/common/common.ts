import {makeDirective, makeSelector} from '../utils/component';
import {loadImageManagement} from './image-management/image-management';
import {NewButton} from './new-button';
import {FormGroupComponent} from './forms/form-group-component';
import {SaveButtonComponent} from './forms/save-button-component';
import {NewButtonSmall} from './new-button-sm';
import {AlertService} from './alert-service';
import {PreviewService} from './preview-service';
import {DeleteButton} from './delete-button';


export function loadCommon(app) {
  loadImageManagement(app);

  app.service('AlertService', AlertService);

  app.service('PreviewService', PreviewService);

  app.factory('PreviewSocket', function (socketFactory) {
    return socketFactory();
  });


  app.directive(
    makeSelector(DeleteButton),
    makeDirective(DeleteButton));

  app.directive(
      makeSelector(NewButton),
      makeDirective(NewButton));

  app.directive(
      makeSelector(NewButtonSmall),
      makeDirective(NewButtonSmall));

  app.directive(
      makeSelector(FormGroupComponent),
      makeDirective(FormGroupComponent));

  app.directive(
      makeSelector(SaveButtonComponent),
      makeDirective(SaveButtonComponent));
}
