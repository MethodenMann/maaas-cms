/// <reference path='../_all.ts' />

module maaas {
  export class LoginCtrl {

    public static $inject = [
      '$scope',
      '$location',
      'LoginService'
    ];

    constructor(
      private $scope,
      private $location: ng.ILocationService,
      private loginService: LoginService
      ) {
      $scope.somestring = 'test112';
      $scope.vm = this;
    }

    change(value: number) {
      console.log('test', value);
      this.loginService.put(value);
		    this.$scope.somestring = this.loginService.get().toString();

      console.log(this.loginService.get());
    }
  }
}
