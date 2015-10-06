export class TestCtrl {
  public static $inject = [
    '$scope',
    '$location',
    'LoginService'
  ];

  constructor(
    private $scope,
    private $location: ng.ILocationService

    ) {
    $scope.somestring = 'test12';
    $scope.vm = this;
  }
}
