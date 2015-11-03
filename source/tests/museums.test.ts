import 'angular';
import 'angular-mocks';

import 'angular-ui-router';
import 'angular-cookies';
import 'angular-resource';
import 'angular-translate';


import {makeDirective, makeSelector} from '../app/utils/component';
import {DetailUpdateView} from "../app/museums/detail-update-view";
import '../app/template-cache';



describe('Museums', () => {
  console.log('Test Museums1');

  let _$scope;
  let _$compile;
  let _$q;

  var mock = {find:function(){}}

  angular.module('cms', ['maaas.templates', 'pascalprecht.translate', 'ui.router'])
    .directive(
      makeSelector(DetailUpdateView),
      makeDirective(DetailUpdateView))
    .service('Museum', function () {
      return mock;
    });


  beforeEach(angular.mock.module('cms'));
  beforeEach(() => {
    angular.mock.inject(($compile, $rootScope, $q) => {

      _$scope = $rootScope.$new();
      _$compile = $compile;
      _$q = $q;

      sinon.stub(mock,'find').returns(_$q.when("Testasdad"));
    });
  });

  it('generate the appropriate HTML...', () => {
    _$scope.museum = {
      name: "nmsg"
    };


    let element = angular.element(
      `<mas-museums-detail-update-view/>`);

    let compiled = _$compile(element)(_$scope);

    _$scope.$digest();
    _$scope.$apply();
    chai.expect(compiled.html()).to.contain('form');
  });
});