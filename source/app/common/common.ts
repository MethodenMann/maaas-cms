import {makeDirective, makeSelector} from '../utils/component';
import {loadImageManagement} from './image-management/image-management';
import {NewButton} from './new-button';
import {FormGroupComponent} from './forms/form-group-component';
import {SaveButtonComponent} from './forms/save-button-component';
import {NewButtonSmall} from './new-button-sm';

export function loadCommon(app) {
  loadImageManagement(app);

  app
  .directive(
    makeSelector(NewButton),
    makeDirective(NewButton));

  app
    .directive(
      makeSelector(NewButtonSmall),
      makeDirective(NewButtonSmall));

    app
    .directive(
      makeSelector(FormGroupComponent),
      makeDirective(FormGroupComponent));

  app
    .directive(
      makeSelector(SaveButtonComponent),
      makeDirective(SaveButtonComponent));
}
