import {Inject} from './../utils/di';
import {IAlert} from './ialert';

export class AuthUtil {
  private isAuthenticatedDeferred;

  constructor(@Inject('$q') protected $q,
              @Inject('Auth') protected Auth) {
    this.isAuthenticatedDeferred = this.$q.defer();
    this.isAuthenticatedDeferred.resolve(true);
  }

  public getMuseumId() {
    var deferred = this.$q.defer();
    this.isAuthenticatedDeferred.promise.then((auth) => {
      if (auth) {
        deferred.resolve(this.Auth._currentUser.museum_id);
      }
      deferred.resolve();
    });
    return deferred.promise;
  }

  public isAuthenticated() {
    if (!this.Auth.isAuthenticated()) {
      console.log('getting user from memory failed. trying to get user from server session');
      this.Auth.currentUser().then((user) => {
        this.isAuthenticatedDeferred.resolve(true);
      }, (error) => {
        this.isAuthenticatedDeferred.resolve(false);
      });
    } else {
      this.isAuthenticatedDeferred.resolve(true);
    }
    return this.isAuthenticatedDeferred.promise;
  }
}
