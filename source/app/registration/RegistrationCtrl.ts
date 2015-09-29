/// <reference path='../_all.ts' />

module maaas {
  export class RegistrationCtrl {

    public static $inject = ['$scope', '$location', 'Auth'];

    constructor(
      private $scope,
      private $location: ng.ILocationService,
      private Auth: any
    ) {
      $scope.vm = this;
    }

    register() {
      var credentials = {
        email: this.$scope.email,
        password: this.$scope.password,
        password_confirmation: this.$scope.password
      };
      var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
      };

      console.log(this.Auth)
      this.Auth.register(credentials, config).then(function(registeredUser) {
      }, function(error) {
      });
    }
  }
}
