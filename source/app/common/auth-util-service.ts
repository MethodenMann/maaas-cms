import {Inject} from './../utils/di';
import {IAlert} from './ialert';


export class AuthUtil {

  constructor(
    @Inject('$q') protected $q,
    @Inject('Auth') protected Auth
    ) {
  }

  public getMuseumId() {
    var deferred = this.$q.defer();
    this.checkAuth().then((auth) => {
      if (auth) {
        deferred.resolve(this.Auth._currentUser.museum_id);
      }
      deferred.resolve();
    });
    return deferred.promise;
  }


  public checkAuth() {
    var deferred = this.$q.defer();

    if (!this.Auth.isAuthenticated()) {
      console.log('getting user from memory failed. trying to get user from server session');
      this.Auth.currentUser().then((user) => {
        deferred.resolve(true);
      }, (error) => {
        deferred.resolve(false);
      });
    } else {
      deferred.resolve(true);
    }

    return deferred.promise;
  }


}
