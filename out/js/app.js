/// <reference path='_all.ts' />
var maaas;
(function (maaas_1) {
    'use strict';
    var maaas = angular.module('maaas', ['ngRoute']);
    angular.module('maaas').config(['$routeProvider',
        function routes($routeProvider) {
            $routeProvider
                .when('/', {
                templateUrl: 'views/MyView.html',
                controller: 'app.controllers.MyController'
            })
                .otherwise({
                redirectTo: '/ttttest'
            });
        }
    ]);
    var Bar;
    (function (Bar) {
        Bar.app = maaas;
    })(Bar = maaas_1.Bar || (maaas_1.Bar = {}));
})(maaas || (maaas = {}));
;
/// <reference path='../_all.ts' />
var maaas;
(function (maaas) {
    'use strict';
    var LoginService = (function () {
        function LoginService() {
            this.numb = 33;
        }
        LoginService.prototype.get = function () {
            return this.numb;
        };
        LoginService.prototype.put = function (i) {
            this.numb = i;
        };
        return LoginService;
    })();
    maaas.LoginService = LoginService;
})(maaas || (maaas = {}));
/// <reference path='../_all.ts' />
var maaas;
(function (maaas) {
    'use strict';
    var LoginCtrl = (function () {
        function LoginCtrl($scope, $location, loginService) {
            this.$scope = $scope;
            this.$location = $location;
            this.loginService = loginService;
            $scope.somestring = 'test1';
            $scope.vm = this;
        }
        LoginCtrl.prototype.changeString = function (value) {
            this.loginService.put(+value);
            this.$scope.somestring = this.loginService.get().toString();
        };
        LoginCtrl.$inject = [
            '$scope',
            '$location',
            'LoginService'
        ];
        return LoginCtrl;
    })();
    maaas.LoginCtrl = LoginCtrl;
})(maaas || (maaas = {}));
/// <reference path='../_all.ts' />
var maaas;
(function (maaas) {
    'use strict';
    var TestCtrl = (function () {
        function TestCtrl($scope, $location) {
            this.$scope = $scope;
            this.$location = $location;
            $scope.somestring = 'test1sd';
            $scope.vm = this;
        }
        TestCtrl.$inject = [
            '$scope',
            '$location',
            'LoginService'
        ];
        return TestCtrl;
    })();
    maaas.TestCtrl = TestCtrl;
    maaas.Bar.app.controller("TestCtrl", TestCtrl);
})(maaas || (maaas = {}));
/// <reference path='../_all.ts' />
var maaas;
(function (maaas) {
    maaas.Bar.app.controller("LoginCtrl", maaas.LoginCtrl);
    maaas.Bar.app.service("LoginService", maaas.LoginService);
})(maaas || (maaas = {}));
/// <reference path="./../typings/tsd.d.ts" />
/// <reference path='app.ts' />
/// <reference path="./login/LoginService.ts"/>
/// <reference path="./login/LoginCtrl.ts"/>
/// <reference path="./test/TestCtrl.ts"/>
/// <reference path="./login/Login.ts"/>
