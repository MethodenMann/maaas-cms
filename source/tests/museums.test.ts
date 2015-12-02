import '../app/template-cache';
import '../app/app'


// import {makeDirective, makeSelector} from '../app/utils/component';
// import {DetailUpdateView} from '../app/museums/detail-update-view';

describe('Museums', () => {
  console.log('Test Museums1');


  let _$scope;
  let _$compile;
  let _$q;

  var MuseumServiceMock = {
    find: () => {
      var deferred = _$q.defer();
      deferred.resolve({ 'name' : 'nmsg', 'description': 'blabla'});
      return deferred.promise;
    }
  };



  // angular.module('cms', ['maaas.templates', 'pascalprecht.translate', 'ui.router'])
  //   .directive(
  //     makeSelector(DetailUpdateView),
  //     makeDirective(DetailUpdateView));



  // beforeEach();

  beforeEach(() => {
    angular.mock.module('maaas')
    // angular.mock.module('maaas.templates')

    angular.mock.module(function ($provide, $translateProvider) {
      $provide.value('Museum', MuseumServiceMock);

      $translateProvider.translations('de', {});
    });


    angular.mock.inject(($compile, $rootScope, $q, $templateCache) => {
      _$scope = $rootScope.$new();
      _$compile = $compile;
      _$q = $q;

      console.log('MASTER VIEW ============================================');
      console.log($templateCache.get('/app/master/master-view.html'));
    });
  });

  it('generate the appropriate HTML...', () => {
    _$scope.museum = {
      name: 'nmsg'
    };

    let element = angular.element(
      `<mas-museums-detail-update-view/>`);

    let compiled = _$compile(element)(_$scope);

    _$scope.$digest();
    chai.expect(compiled.html()).to.contain('form');
  });
});
