import {Directive} from '../util/decorators/Directive';

@Directive('$location', '$rootScope')
export class LoginButton implements ng.IDirective {
  public templateUrl:string = 'app/login/view/loginbutton.html';
  public restrict:string = 'EA';
  public scope:Object = {
    story: '='
  };

  public link:Function = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes):void => {
    return null;
  };

  // @ngInject
  constructor(private $location:ng.ILocationService, private $rootScope:ng.IScope) {

  }

}
