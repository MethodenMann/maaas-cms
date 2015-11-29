import {Inject} from '../utils/di';
import {DetailAbstract} from './detail-abstract';
import {IMedium} from '../media/imedium';
import {IMuseum} from './imuseum';

export class DetailCreateView extends DetailAbstract {
  public static selector = 'mas-museums-detail-create-view';
  public static templateUrl = 'app/museums/detail-view.html';

  private createMuseum = true;
  private invitations:Array<any>;

  loadData() {
    this.Auth.currentUser().then((user) => {
      this.Invitation.findAll({forUser: true}).then((invitations) => {
        this.invitations = invitations;
      });
    });
  }

  saveHook() {
    this.Museum.create({museum: this.museum}).then((museum:IMuseum) => {
      this.$scope.$broadcast('save', {id: museum.id, type: 'Area'});
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
      this.$state.go('cms.museums.detail.update', {museumId: museum.id});

      this.Auth._currentUser.museum_id = museum.id;
    });
  }

  acceptInvitation(invitation) {
    this.Museum.update(invitation.museumId,
         {museum: {addUser: this.Auth._currentUser.id}}).then((museum) => {
      this.Auth._currentUser.museum_id = invitation.museumId;
      this.$state.go('cms.welcome');
    });
  }
}
