import {makeDirective, makeSelector} from '../utils/component';
import {loadImageManagement} from './image-management/image-management';
import {NewButton} from './new-button';
import {FormGroupComponent} from './forms/form-group-component';

export function loadCommon(app) {
  loadImageManagement(app);

  app
  .directive(
    makeSelector(NewButton),
    makeDirective(NewButton));

    app
    .directive(
      makeSelector(FormGroupComponent),
      makeDirective(FormGroupComponent));
}
