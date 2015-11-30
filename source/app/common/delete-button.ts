import {Inject} from '../utils/di';

export class DeleteButton {
  private static templateUrl = './app/common/delete-button.html';
  private static selector = 'mas-delete-button';

  private static options = {
    bindToController: {
      titleRes: '@',
      confirmRes: '@',
      id: '@',
      type: '@'
    }
  };


  private id;
  private type;
  constructor(@Inject('DS') protected DS) {

  }



  public delete() {
    this.DS.definitions[this.type].destroy(this.id);
  }




}
