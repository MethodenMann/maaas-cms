import {makeDirective, makeSelector} from '../utils/component';
import {loadImageManagement} from './image-management/image-management';
import {NewButton} from './new-button';

export function loadCommon(app) {
  loadImageManagement(app);

  app
  .directive(
    makeSelector(NewButton),
    makeDirective(NewButton))

}