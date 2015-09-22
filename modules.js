/// <reference path='../_all.ts' />
var maaas;
(function (maaas) {
    'use strict';
    var Area = (function () {
        function Area(name, visible, id) {
            this.name = name;
            this.visible = visible;
            this.id = id;
        }
        return Area;
    })();
    maaas.Area = Area;
})(maaas || (maaas = {}));
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
var maaas;
(function (maaas) {
    'use strict';
    var AreaCtrl = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function AreaCtrl($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            //this.areas =
            $scope.somestring = 'schmaul';
            $scope.vm = this;
        }
        AreaCtrl.prototype.changeString = function (value) {
            this.$scope.somestring = value;
        };
        //private areas: Area[];
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        AreaCtrl.$inject = [
            '$scope',
            '$location'
        ];
        return AreaCtrl;
    })();
    maaas.AreaCtrl = AreaCtrl;
})(maaas || (maaas = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path='app.ts' />
/// <reference path='models/area.ts' />
/// <reference path='interfaces/iAreaScope.ts' />
/// <reference path='controllers/areaController.ts' />
/// <reference path='_all.ts' />
var maaas;
(function (maaas) {
    'use strict';
    var maaascms = angular.module('maaascms', [])
        .controller('areaCtrl', maaas.AreaCtrl);
})(maaas || (maaas = {}));
