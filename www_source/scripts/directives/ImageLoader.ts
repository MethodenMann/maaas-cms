/// <reference path='../_all.ts' />

module maaas {
  'use strict';

  export function ImageLoader(): ng.IDirective {
    return {
      restrict: 'A',
      replace: true,
      link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrls) => {
        console.log("blabla");
      }
    };
  }
  // myDirective.$inject = ['toaster'];
}
