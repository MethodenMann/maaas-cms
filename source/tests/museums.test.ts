//import 'angular';
//import 'angular-mocks';
//
//
//import 'jquery';
//import 'bootstrap';
//import 'metis-menu';
//import 'jquery-cloudinary';
//import 'jquery.ui.sortable';
//
//import 'angular-ui-router';
//import 'angular-cookies';
//import 'angular-resource';
//import 'angular-translate';
//import 'angular-translate-storage-cookie';
//import 'angular-translate-loader-partial';
//import 'angular-translate-storage-local';
//import 'angular-breadcrumb';
//import 'angular-ui-tinymce';
//
//
//import 'js-data';
//import 'js-data-http';
//import 'js-data-angular';
//
//import 'devise';
//import 'angularjs-color-picker';
//
//
//import {makeDirective, makeSelector} from '../app/utils/component';
//import {DetailUpdateView} from '../app/museums/detail-update-view';
//import '../app/template-cache';
//
//
//
//
//describe('Museums', () => {
//  console.log('Test Museums1');
//
//
//  let _$scope;
//  let _$compile;
//  let _$q;
//
//  var MuseumServiceMock =  {
//      find: () => {
//        var deferred = _$q.defer();
//        deferred.resolve({ 'name' : 'nmsg', 'description': 'blabla'});
//        return deferred.promise;
//      }
//    };
//
//
//
//  angular.module('cms', ['maaas.templates', 'pascalprecht.translate', 'ui.router'])
//    .directive(
//      makeSelector(DetailUpdateView),
//      makeDirective(DetailUpdateView));
//
//
//  beforeEach(angular.mock.module('cms'));
//
//  beforeEach(() => {
//    angular.mock.module(function ($provide) {
//      $provide.value('Museum', MuseumServiceMock);
//    });
//
//
//    angular.mock.inject(($compile, $rootScope, $q) => {
//      _$scope = $rootScope.$new();
//      _$compile = $compile;
//      _$q = $q;
//    });
//  });
//
//  it('generate the appropriate HTML...', () => {
//    _$scope.museum = {
//      name: 'nmsg'
//    };
//
//
//    let element = angular.element(
//      `<mas-museums-detail-update-view/>`);
//
//    let compiled = _$compile(element)(_$scope);
//
//    _$scope.$digest();
//    chai.expect(compiled.html()).to.contain('form');
//  });
//});
