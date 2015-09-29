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

      Auth.currentUser().then((user) => {
        console.log(user);
      });

      var credentials = {
        email: "a@b.com",
        password: "testtest",
        password_confirmation: "testtest"
      };
      var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
      }

      Auth.login(credentials, config).then((user) => {
        console.log(user);

        Auth.currentUser().then((user) => {
          console.log("here", user);
        });
      });
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

      this.Auth.register(credentials, config).then(function(registeredUser) {
      }, function(error) {
      });
    }
  }
}
