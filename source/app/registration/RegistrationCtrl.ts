/// <reference path='../_all.ts' />

interface IArea {
  id : number;
}

module maaas {
  export class RegistrationCtrl {

    public static $inject = ['$scope', '$location', 'Auth', 'AreaService', 'Area', 'Beacon'];

    constructor(
      private $scope,
      private $location: ng.ILocationService,
      private Auth: any,
      private AreaService: AreaService,
      private Area,
      private Beacon
    ) {
      $scope.vm = this;

      Beacon.findAll().then((beacons) => {
        console.log(beacons);
        Area.findAll().then((areas) => {
          console.log(areas);
          console.log(areas[2].beacons);
          var area : IArea = beacons[1].area;
          console.log(area.id);
        });
      });



      // this.AreaService.getAllAreas().$promise.then((abc) => {
      //   console.log(abc);
      // });

      // Auth.currentUser().then((user) => {
      //   console.log(user);
      // });
      //
      // var credentials = {
      //   email: "a@b.com",
      //   password: "testtest",
      //   password_confirmation: "testtest"
      // };
      // var config = {
      //   headers: {
      //       'X-HTTP-Method-Override': 'POST'
      //   }
      // }
      //
      // Auth.login(credentials, config).then((user) => {
      //   console.log(user);
      //
      //   Auth.currentUser().then((user) => {
      //     console.log("here", user);
      //   });
      // });
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
