/// <reference path='../_all.ts' />

module maaas {

  @Directive("$location", "$rootScope")
  export class LoginButton implements ng.IDirective {
    public template:string = "!my login directive!";
    public restrict:string = "EA";
    public scope:Object = {
      story: "="
    };

    public link:Function = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes):void => {
      return null;
    };

    // @ngInject
    constructor(private $location:ng.ILocationService, private $rootScope:ng.IScope) {

    }

  }
}
