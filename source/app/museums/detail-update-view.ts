import {Inject} from '../utils/di';
import {DetailAbstract} from './detail-abstract';
import {IMediumUploadBroadcast} from '../common/image-management/imedium-upload-broadcast';

export class DetailUpdateView extends DetailAbstract {
  public static selector = 'mas-museums-detail-update-view';
  public static templateUrl = 'app/museums/detail-view.html';

  private invitations:Array<any>;
  private emailToInvite:string;

  loadData() {
    this.Museum.find(this.$stateParams.museumId).then((data) => {
      this.museum = data;
    });

    this.Invitation.findAll().then((invitations) => {
      this.invitations = invitations;
    });
  }

  submitInvitation() {
    for (let el of this.invitations) {
      if (el.email === this.emailToInvite) {
        return;
      }
    }
    var payload:any = {};
    payload.invitation = {email: this.emailToInvite};
    this.Invitation.create(payload).then((invitation) => {
      this.invitations.push(invitation);
    });
  }

  saveHook() {
    this.Museum.update(this.museum.id, {museum: this.museum}).then(() => {
      this.$scope.$broadcast('save', {id: this.museum.id, type: 'Museum'});
      this.$scope.$broadcast('mas.saveprogess', 'successfully');
    });
  }
}
