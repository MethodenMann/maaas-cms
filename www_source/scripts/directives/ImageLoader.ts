/// <reference path='../_all.ts' />

interface JQueryStatic {
  cloudinary: any;
}

module maaas {
  'use strict';

  export function ImageLoader(): ng.IDirective {
    return {
      restrict: 'A',
      replace: true,
      link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        console.log('blabla');

        $('.upload_form').append($.cloudinary.unsigned_upload_tag('zcudy0uz',
          { cloud_name: 'demo' }));
      }
    };
  }
  // myDirective.$inject = ['toaster'];
}
