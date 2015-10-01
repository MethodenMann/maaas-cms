/// <reference path='../_all.ts' />

module maaas {
  export function GetMasterRoute(name) {
    return {
      url: '/' + name,
      templateUrl: './app/master/view/content.html'
    };
  }
}
