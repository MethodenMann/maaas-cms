(function() {
  var starter;

  window.BeaconManagerInterval = 1000;

  window.PaperChase = angular.module("PaperChase", ["ngResource"]);

  window.PaperChaseBeaconSimulator = angular.module("PaperChaseBeaconSimulator", []);

  starter = angular.module("starter", ["ionic", "ngCordova", "ui.sortable", "PaperChase", "btford.socket-io"]).run(function($ionicPlatform, $cordovaSplashscreen, $state, $ionicPopup, BeaconManager, Beacon, RestApi, DataStore, AppData, NavigationService, StickerbookNavigation, PreviewService) {
    $ionicPlatform.ready(function() {
      var alertPopUp, areaKey, areaKeys, _i, _len, _results;
      if (typeof cordova === "undefined" || cordova === null) {
        PreviewService.init();
      }
      if (typeof cordova !== "undefined" && cordova !== null) {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
        if (screen.lockOrientation != null) {
          screen.lockOrientation('portrait');
        }
        cordova.plugins.locationManager.isBluetoothEnabled().then(function(isEnabled) {
          var confirmPopUp;
          if (!isEnabled) {
            if (ionic.Platform.isAndroid()) {
              confirmPopUp = $ionicPopup.confirm({
                title: 'Bluetooth',
                template: 'Damit das App funktioniert muss Bluetooth eingeschaltet sein. Soll Bluetooth aktiviert werden?',
                okText: "Ja",
                cancelText: "Nein"
              });
              return confirmPopUp.then(function(res) {
                if (res) {
                  return cordova.plugins.locationManager.enableBluetooth();
                }
              });
            } else {
              return $ionicPopup.confirm({
                title: 'Bluetooth',
                template: 'Damit das App funktioniert muss Bluetooth eingeschaltet sein'
              });
            }
          }
        }).fail(console.error).done();
      }
      if (window.Connection) {
        if (navigator.connection.type === Connection.NONE) {
          alertPopUp = $ionicPopup.alert({
            title: 'Internet Verbindung',
            template: 'Das App braucht eine Internetverbindung um Informationen zu laden. Verbinden Sie sich mit dem W-Lan des Museums!'
          });
          alertPopUp.then(function(res) {
            return ionic.Platform.exitApp();
          });
        }
      }
      DataStore.initialize();
      DataStore.awaitLoadCompletion().then(function() {
        var areaBeacons, beacon, questBeacons, _i, _len, _ref;
        areaBeacons = [];
        questBeacons = [];
        _ref = DataStore.getBeacons();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          beacon = _ref[_i];
          if (beacon.kind === "area_beacon") {
            areaBeacons.push(beacon);
          } else {
            questBeacons.push(beacon);
          }
        }
        BeaconManager.registerBeacons("area", areaBeacons, true);
        BeaconManager.registerBeacons("quest", questBeacons, false);
        BeaconManager.start();
        try {
          return $cordovaSplashscreen.hide();
        } catch (_error) {}
      });
      areaKeys = [];
      _results = [];
      for (_i = 0, _len = areaKeys.length; _i < _len; _i++) {
        areaKey = areaKeys[_i];
        _results.push(AppData.saveQuestCompletion(areaKey));
      }
      return _results;
    });
    $ionicPlatform.registerBackButtonAction((function(event) {
      var confirmPopup;
      if ($state.$current.name === 'app.home') {
        confirmPopup = $ionicPopup.confirm({
          title: "Wollen Sie die Applikation schliessen?",
          template: "",
          cancelText: "Nein",
          okType: "button-assertive"
        });
        confirmPopup.then(function(res) {
          if (res) {
            return navigator.app.exitApp();
          }
        });
      } else if ($state.$current.name === 'app.stickerbook') {
        StickerbookNavigation.goBack();
      } else if ($state.$current.name === 'app.area') {
        NavigationService.navigateToHome();
      } else {
        navigator.app.backHistory();
      }
    }), 100);
  });

  starter.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $urlRouterProvider.otherwise("/app/home");
    $stateProvider.state("app", {
      url: "/app",
      abstract: true,
      templateUrl: "templates/template.html",
      controller: "AppCtrl"
    }).state("app.home", {
      url: "/home",
      views: {
        partial: {
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
        }
      }
    }).state("app.beacontracker", {
      url: "/beacontracker",
      views: {
        partial: {
          templateUrl: "templates/beacontracker.html",
          controller: "BeaconTrackerCtrl"
        }
      }
    }).state("app.loading", {
      url: "/loading",
      views: {
        partial: {
          templateUrl: "templates/loading.html",
          controller: "LoadingCtrl"
        }
      }
    }).state("app.beaconSimulator", {
      url: "/beaconSimulator",
      views: {
        partial: {
          templateUrl: "templates/beacon-simulator-modal.html",
          controller: "BeaconSimulatorCtrl"
        }
      }
    }).state("app.area", {
      url: "/area/:areaKey",
      views: {
        partial: {
          templateUrl: "templates/area.html",
          controller: "AreaCtrl"
        }
      }
    }).state("app.content", {
      url: "/area/:areaKey/content/:contentId",
      views: {
        partial: {
          templateUrl: "templates/content.html",
          controller: "ContentCtrl"
        }
      }
    }).state("app.quiz", {
      url: "/quiz/:areaKey",
      views: {
        partial: {
          templateUrl: "templates/quiz.html",
          controller: "QuizCtrl"
        }
      }
    }).state("app.help", {
      url: "/help",
      views: {
        partial: {
          templateUrl: "templates/help.html",
          controller: "HelpCtrl"
        }
      }
    }).state("app.settings", {
      url: "/settings",
      views: {
        partial: {
          templateUrl: "templates/settings.html",
          controller: "SettingsCtrl"
        }
      }
    }).state("app.quicknavigation", {
      url: "/quicknavigation",
      views: {
        partial: {
          templateUrl: "templates/quicknavigation.html",
          controller: "QuickNavigationCtrl"
        }
      }
    }).state("app.stickerbook", {
      url: "/stickerbook",
      views: {
        partial: {
          templateUrl: "templates/stickerbook.html",
          controller: "StickerbookCtrl"
        }
      }
    });
  });

  starter.controller("AppCtrl", function($scope, $rootScope, NavigationService, RandomBeaconData, DataStore, $ionicModal, DevMode) {
    $scope.DevMode = DevMode;
    $ionicModal.fromTemplateUrl("templates/beacon-simulator-modal.html", {
      scope: $scope
    }).then(function(modal) {
      $scope.beaconSimulatorModal = modal;
    });
    $scope.showBeaconSimulator = function() {
      $scope.beaconSimulatorModal.show();
    };
    $scope.openBeaconSimulator = function() {
      var popupWindow;
      popupWindow = window.open("/templates/beacon-simulator.html", "beacon-simulator");
      return popupWindow.sharedRandomBeaconData = RandomBeaconData;
    };
    $scope.sendARandomBeaconData = function() {
      var beacons, random;
      beacons = DataStore.getBeacons();
      random = Math.floor(Math.random() * 12);
      return $rootScope.$broadcast('areaBeaconUpdate', [
        {
          "minor": beacons[random].minor
        }
      ]);
    };
  });

}).call(this);

(function() {
  var f;

  f = function($scope, $timeout, $stateParams, $ionicPopup, NavigationService, DataStore, BeaconManager, Dictionary, AppData, DevMode) {
    var accuracyToOwnProximity, activateSearchForSticker, areaCtrl, collectedImmediates, deactivateSearchForSticker, questSolved;
    $scope.DevMode = DevMode;
    questSolved = false;
    $scope.solvedClass = "pap-sticker-unsolved";
    $scope.$on("$ionicView.enter", function() {
      return $scope.show = "pap-show";
    });
    areaCtrl = function() {
      $scope.show = "";
      $scope.areaKey = $stateParams.areaKey;
      $scope.contentClass = "pap-content-" + $scope.areaKey;
      $scope.backButtonLabel = Dictionary.getHomeTitle();
      $scope.searchingForSticker = false;
      if (AppData.isQuestCompleted($scope.areaKey)) {
        questSolved = true;
        return $scope.solvedClass = "pap-sticker-solved";
      }
    };
    areaCtrl();
    DataStore.awaitLoadCompletion().then(function() {
      var currentArea;
      currentArea = DataStore.getAreaByKey($scope.areaKey);
      $scope.currentArea = currentArea;
      $scope.backgroundImageStyle = function() {
        return {
          "background-image": "url('" + currentArea.styles.backgroundImageUrl + "')"
        };
      };
      $scope.buttonFrontStyle = function() {
        return {
          "background-image": "url('" + currentArea.styles.stickerImageUrl + "')"
        };
      };
      return $scope.primaryColorStyle = function() {
        return {
          "color": currentArea.styles.primaryColor
        };
      };
    });
    $scope.navigateToQuiz = function() {
      return NavigationService.navigateToQuiz($scope.areaKey);
    };
    $scope.navigateToHome = function() {
      return NavigationService.navigateToHome();
    };
    $scope.navigateToContent = function(contentId) {
      return NavigationService.navigateTo("app/area/" + $scope.areaKey + "/content/" + contentId);
    };
    accuracyToOwnProximity = function(accuracy) {
      if (accuracy <= 0.8) {
        return "immediate";
      } else if (accuracy <= 1.2) {
        return "near";
      } else {
        return "far";
      }
    };
    collectedImmediates = 0;
    activateSearchForSticker = function() {
      var beacon;
      if ($scope.currentArea != null) {
        beacon = DataStore.getBeaconById($scope.currentArea.questBeaconId);
        return BeaconManager.registerSingleBeaconRanging(beacon.minor, function(beaconData) {
          var ownProximity;
          ownProximity = "far";
          if (beaconData != null) {
            ownProximity = accuracyToOwnProximity(beaconData.accuracy);
            if (ownProximity === "immediate") {
              collectedImmediates += 1;
            } else {
              if (collectedImmediates > 0) {
                collectedImmediates -= 1;
              }
            }
          } else {

          }
          $scope.questFoundClass = "pap-quest-found-" + ownProximity;
          if (collectedImmediates > 3) {
            BeaconManager.deregisterSingleBeaconRanging();
            $scope.questFoundClass = "pap-quest-found";
            return $timeout((function() {
              return $scope.navigateToQuiz();
            }), 1000);
          }
        });
      }
    };
    deactivateSearchForSticker = function() {
      collectedImmediates = 0;
      return BeaconManager.deregisterSingleBeaconRanging();
    };
    return $scope.toggleSticker = function() {
      var confirmPopUp;
      if (questSolved) {
        confirmPopUp = $ionicPopup.confirm({
          title: 'Bereits gelöst',
          template: 'Der Sticker klebt bereits in deinem Stickerheft. Du kannst das Quiz aber jederzeit nochmals lösen.',
          okText: "Nochmals",
          cancelText: "Zurück"
        });
        return confirmPopUp.then(function(res) {
          if (res) {
            return $scope.navigateToQuiz();
          }
        });
      } else {
        $scope.searchingForSticker = !$scope.searchingForSticker;
        if ($scope.searchingForSticker) {
          return activateSearchForSticker();
        } else {
          return deactivateSearchForSticker();
        }
      }
    };
  };

  PaperChase.controller("AreaCtrl", ["$scope", "$timeout", "$stateParams", "$ionicPopup", "NavigationService", "DataStore", "BeaconManager", "Dictionary", "AppData", "DevMode", f]);

}).call(this);

(function() {
  var f;

  f = function($scope, BeaconManager, AccuracyFilter) {
    $scope.msg = "Test";
    $scope.beaconDatas = [];
    BeaconManager.initialize;
    $scope.interval = {};
    $scope.interval.v = 199;
    $scope.milliseconds = {};
    $scope.milliseconds.v = 5000;
    $scope.history = {};
    $scope.history.v = 5;
    $scope.$on("areaBeaconUpdate", function(e, beaconDatas) {
      return $scope.beaconDatas = beaconDatas;
    });
    $scope.registerQuizCallback = function() {
      return BeaconManager.registerSingleBeaconRanging(99, function(beaconData) {
        return $scope.callbackBeaconAccuracy = beaconData.accuracy;
      });
    };
    $scope.registerQuizCallback();
    $scope.changeSettings = function() {
      AccuracyFilter.configure($scope.history.v, $scope.milliseconds.v);
      window.BeaconManagerInterval = $scope.interval.v;
      return BeaconManager.resetInterval();
    };
  };

  PaperChase.controller("BeaconTrackerCtrl", ["$scope", "BeaconManager", "AccuracyFilter", f]);

}).call(this);

(function() {
  var f;

  f = function($scope, $location, $stateParams, $ionicModal, $sce, DataStore, NavigationService) {
    var areaKey, contentId;
    if (screen.unlockOrientation != null) {
      screen.unlockOrientation();
    }
    contentId = parseInt($stateParams.contentId);
    areaKey = $stateParams.areaKey;
    $scope.contentClass = "pap-content-" + areaKey;
    DataStore.awaitLoadCompletion().then(function() {
      $scope.content = DataStore.getContent(areaKey, contentId);
      return $scope.html = $sce.trustAsHtml($scope.content.data);
    });
    $scope.navigateToArea = function() {
      return NavigationService.navigateToArea(areaKey, "back");
    };
    $ionicModal.fromTemplateUrl('templates/imagemodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    $scope.showImage = function($event) {
      $scope.imageSrc = $event.toElement.src;
      $scope.openModal();
    };
    $scope.$on('$ionicView.leave', function() {
      if (screen.unlockOrientation != null) {
        return screen.lockOrientation('portrait');
      }
    });
  };

  PaperChase.controller("ContentCtrl", ["$scope", "$location", "$stateParams", "$ionicModal", "$sce", "DataStore", "NavigationService", f]);

}).call(this);

(function() {
  var f;

  f = function($scope, $ionicPopup, NavigationService, DevMode) {
    $scope.navigateToHome = function() {
      return NavigationService.navigateToHome();
    };
    return $scope.openPasswordDialog = function() {
      $scope.data = {};
      return $ionicPopup.show({
        template: '<input type="password" ng-model="data.password">',
        title: 'Passwort eingeben',
        subTitle: '',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel'
          }, {
            text: '<b>Bestätigen</b>',
            type: 'button-positive',
            onTap: function(e) {
              console.log("pw", $scope.data.password);
              if ($scope.data.password === "biber") {
                return DevMode.switchDevModeOn();
              }
            }
          }
        ]
      });
    };
  };

  PaperChase.controller("HelpCtrl", ["$scope", "$ionicPopup", "NavigationService", "DevMode", f]);

}).call(this);

(function() {
  var f;

  f = function($scope, $ionicModal, DataStore, AppData, NavigationService, Dictionary, DevMode) {
    $scope.nearestArea = void 0;
    $scope.DevMode = DevMode;
    $ionicModal.fromTemplateUrl("templates/beacon-simulator-modal.html", {
      scope: $scope
    }).then(function(modal) {
      $scope.beaconSimulatorModal = modal;
    });
    $scope.showBeaconSimulator = function() {
      $scope.beaconSimulatorModal.show();
    };
    $scope.title = Dictionary.getHomeTitle();
    $scope.navigateToQuickNavigation = function() {
      return NavigationService.navigateTo('app/quicknavigation');
    };
    $scope.navigateToStickerbook = function() {
      return NavigationService.navigateToStickerbook();
    };
    $scope.navigateToHelp = function() {
      return NavigationService.navigateToHelp();
    };
    $scope.navigateToSettings = function() {
      return NavigationService.navigateToSettings();
    };
    $scope.navigateToQuiz = function(areaKey) {
      return NavigationService.navigateToQuiz(areaKey);
    };
    $scope.navigateToArea = function(areaKey) {
      return NavigationService.navigateToArea(areaKey);
    };
    return $scope.resetScore = function() {
      return AppData.reset();
    };
  };

  PaperChase.controller("HomeCtrl", ["$scope", "$ionicModal", "DataStore", "AppData", "NavigationService", "Dictionary", "DevMode", f]);

}).call(this);

(function() {
  var f;

  f = function($scope, NavigationService, DataStore) {
    $scope.areas = [];
    DataStore.awaitLoadCompletion().then(function() {
      return $scope.areas = DataStore.getAreas();
    });
    return $scope.navigateToArea = function(area) {
      return NavigationService.navigateToArea(area.key);
    };
  };

  PaperChase.controller("QuickNavigationCtrl", ["$scope", "NavigationService", "DataStore", f]);

}).call(this);

(function() {
  var assignQuizPreparer, f, imageregionQuizPreparer, kindToDirectiveMapping, multiplechoiceQuizPreparer, orderQuizPreparer, quizLoader, truefalseQuizPreparer;

  assignQuizPreparer = function($scope, $element, area) {
    $scope.listA = area.challenge.data.listA;
    $scope.listB = area.challenge.data.listB;
    $scope.question = area.challenge.data.question;
    return $element.html("<pap-quiz-assign list-a='listA' list-b='listB' question='question'></pap-quiz-assign>");
  };

  orderQuizPreparer = function($scope, $element, area) {
    $scope.list = area.challenge.data.list;
    $scope.question = area.challenge.data.question;
    return $element.html("<pap-quiz-order list='list' question='question'></pap-quiz-order>");
  };

  truefalseQuizPreparer = function($scope, $element, area) {
    $scope.questions = area.challenge.data;
    return $element.html("<pap-quiz-truefalse questions-raw='questions'></pap-quiz-truefalse>");
  };

  multiplechoiceQuizPreparer = function($scope, $element, area) {
    $scope.data = area.challenge.data;
    return $element.html("<pap-quiz-multiplechoice data='data'></pap-quiz-multiplechoice>");
  };

  imageregionQuizPreparer = function($scope, $element, area) {
    $scope.data = area.challenge.data;
    return $element.html("<pap-quiz-imageregion data='data'></pap-quiz-imageregion>");
  };

  kindToDirectiveMapping = {
    "assign": {
      prepare: assignQuizPreparer
    },
    "order": {
      prepare: orderQuizPreparer
    },
    "true-false": {
      prepare: truefalseQuizPreparer
    },
    "multiple-choice": {
      prepare: multiplechoiceQuizPreparer
    },
    "image-region": {
      prepare: imageregionQuizPreparer
    }
  };

  quizLoader = function(DataStore, $compile) {
    return {
      restrict: "E",
      replace: true,
      template: "<div></div>",
      scope: {
        areaKey: "@"
      },
      link: function($scope, $element, $attrs) {
        return DataStore.awaitLoadCompletion().then(function() {
          var area, areaKey, directiveConfig;
          areaKey = $scope.areaKey;
          area = DataStore.getAreaByKey(areaKey);
          directiveConfig = kindToDirectiveMapping[area.challenge.kind];
          directiveConfig.prepare($scope, $element, area);
          return $compile($element)($scope);
        });
      }
    };
  };

  PaperChase.directive("papQuizLoader", ["DataStore", "$compile", quizLoader]);

  f = function($scope, $location, $ionicSideMenuDelegate, $ionicPopup, NavigationService, AppData, DataStore, DevMode) {
    var areaKey, completeQuiz, failQuiz;
    $scope.DevMode = DevMode;
    areaKey = $location.path().replace("/app/quiz/", "");
    $scope.currentAreaKey = areaKey;
    $ionicSideMenuDelegate.canDragContent(false);
    completeQuiz = function(customSuccessfulMessage) {
      var currentArea;
      AppData.saveQuestCompletion(areaKey);
      $scope.areaStickerClass = "pap-sticker-" + areaKey;
      currentArea = DataStore.getAreaByKey(areaKey);
      $scope.areaStickerName = currentArea.title;
      if (customSuccessfulMessage != null) {
        $scope.successfulMessage = customSuccessfulMessage;
      } else {
        $scope.successfulMessage = "Du hast das Quiz gelöst. Super!";
      }
      return $ionicPopup.show({
        templateUrl: "templates/quiz-completed-popup.html",
        title: "Geschafft!",
        scope: $scope,
        buttons: [
          {
            text: "Weiter",
            type: "button-positive",
            onTap: function(e) {
              return NavigationService.navigateToStickerbook();
            }
          }
        ]
      });
    };
    failQuiz = function() {
      return $ionicPopup.show({
        template: "Leider hat es nicht ganz gereicht f&uuml;r den Sticker. Versuche es einfach nochmals dann klappt es bestimmt!",
        title: " Nicht Geschafft!",
        buttons: [
          {
            text: "Zur&uuml;ck",
            type: "button-positive",
            onTap: function(e) {
              return NavigationService.navigateToArea(areaKey);
            }
          }
        ]
      });
    };
    $scope.completeQuiz = function() {
      return completeQuiz();
    };
    return $scope.$on("quizCompleted", function(event, args) {
      if (args.successfully) {
        return completeQuiz(args.customSuccessfulMessage);
      } else {
        return failQuiz();
      }
    });
  };

  PaperChase.controller("QuizCtrl", ["$scope", "$location", "$ionicSideMenuDelegate", "$ionicPopup", "NavigationService", "AppData", "DataStore", "DevMode", f]);

}).call(this);

(function() {
  var f;

  f = function($scope, $ionicPopup, NavigationService, AppData, DevMode) {
    $scope.navigateToHome = function() {
      return NavigationService.navigateToHome();
    };
    $scope.resetScore = function() {
      var confirmPopUp;
      confirmPopUp = $ionicPopup.confirm({
        title: 'Zurücksetzen',
        template: 'Bist du sicher? Du wirst sämmtliche gesammelten Stickers verlieren.',
        okText: 'Ja',
        okType: 'button-assertive',
        cancelText: 'Abbrechen'
      });
      return confirmPopUp.then(function(res) {
        if (res) {
          return AppData.reset();
        }
      });
    };
    return $scope.openPasswordDialog = function() {
      $scope.data = {};
      return $ionicPopup.show({
        template: '<input type="password" ng-model="data.password">',
        title: 'Passwort eingeben',
        subTitle: '',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel'
          }, {
            text: '<b>Bestätigen</b>',
            type: 'button-positive',
            onTap: function(e) {
              console.log("pw", $scope.data.password);
              if ($scope.data.password === "biber") {
                return DevMode.switchDevModeOn();
              }
            }
          }
        ]
      });
    };
  };

  PaperChase.controller("SettingsCtrl", ["$scope", "$ionicPopup", "NavigationService", "AppData", "DevMode", f]);

}).call(this);

(function() {
  var f, papStickerInteraction, subCtrl;

  papStickerInteraction = function($timeout) {
    return {
      restrict: "A",
      link: function($scope, $element, $attrs) {
        var animationRunning;
        animationRunning = false;
        return $element.on("click", function() {
          if (!animationRunning) {
            animationRunning = true;
            $element.addClass("pap-sticker-interaction");
            return $timeout((function() {
              $element.removeClass("pap-sticker-interaction");
              return animationRunning = false;
            }), 1000);
          }
        });
      }
    };
  };

  PaperChase.directive("papStickerInteraction", ["$timeout", papStickerInteraction]);

  subCtrl = function($timeout) {
    return {
      restrict: "E",
      require: "^papDraggablesContainer",
      scope: true,
      link: function($scope, $element, $attrs, Ctrl) {
        var animationRunning, runAnimation;
        animationRunning = {};
        runAnimation = function(element) {
          var id;
          id = element.attr("id");
          if (!animationRunning[id]) {
            animationRunning[id] = true;
            element.addClass("pap-sticker-interaction");
            return $timeout((function() {
              element.removeClass("pap-sticker-interaction");
              return animationRunning[id] = false;
            }), 1000);
          }
        };
        Ctrl.onTouch(function($event, coordinates, boundingBox) {
          if (boundingBox != null) {
            return runAnimation(boundingBox.element);
          }
        });
        Ctrl.onDrag(function($event, coordinates, boundingBox) {
          if (boundingBox != null) {
            return runAnimation(boundingBox.element);
          }
        });
        return Ctrl.onRelease(function($event, coordinates, boundingBox) {});
      }
    };
  };

  PaperChase.directive("papStickerbookSubCtrl", ["$timeout", subCtrl]);

  f = function($scope, $timeout, $ionicConfig, $ionicPopup, $ionicHistory, AppData, DataStore, NavigationService, StickerbookNavigation) {
    var completedQuests;
    completedQuests = AppData.getCompletedQuests();
    $scope.backButtonLabel = StickerbookNavigation.getBackButtonLabel();
    $scope.goBack = function() {
      return StickerbookNavigation.goBack();
    };
    $scope.getClasses = function(areaKey) {
      var classes;
      classes = [];
      if (!completedQuests[areaKey]) {
        classes.push("pap-sticker-transparent");
      }
      return classes;
    };
    $scope.getStyle = function(areaKey) {
      var area;
      area = DataStore.getAreaByKey(areaKey);
      return {
        "background-image": "url('" + area.styles.stickerImageUrl + "')"
      };
    };
    $scope.loadStickers = function() {
      return DataStore.awaitLoadCompletion().then(function() {
        $scope.quests = DataStore.getAreaKeys();
        return $scope.status = "Du hast " + (Object.keys(completedQuests).length) + " von " + $scope.quests.length + " Stickers gesammelt!";
      });
    };
    $scope.$on("$ionicView.enter", function() {
      $timeout($scope.loadStickers, 100);
      return $scope.show = "pap-show";
    });
    $scope.checkForFinish = function() {
      return AppData.allQuetsCompleted().then(function(completed) {
        if (completed) {
          return $ionicPopup.alert({
            template: "Hurra! Du hast alle Stickers gesammelt!",
            title: "Gratulation!"
          });
        }
      });
    };
    return $scope.checkForFinish();
  };

  PaperChase.controller("StickerbookCtrl", ["$scope", "$timeout", "$ionicConfig", "$ionicPopup", "$ionicHistory", "AppData", "DataStore", "NavigationService", "StickerbookNavigation", f]);

}).call(this);

(function() {
  var f;

  f = function($timeout, NavigationService, DataStore) {
    return {
      restrict: 'E',
      templateUrl: 'templates/areaslider.html',
      scope: {
        currentAreaKey: "@"
      },
      link: function($scope) {
        var doAfterTransition, getAreaToNavigateTo, isTransitionInProgress, setAreaToNavigateToHome, slideAway, slideIn;
        isTransitionInProgress = false;
        $scope.areaToNavigate = void 0;
        $scope.transitionClass = "area-slider-hidden";
        $scope.navigate = function() {
          if ($scope.areaToNavigate.key !== "home") {
            return NavigationService.navigateToArea($scope.areaToNavigate.key);
          }
        };
        $scope.getGotoImageSrc = function() {
          var _ref;
          return (_ref = $scope.areaToNavigate) != null ? _ref.styles.gotoImageUrl : void 0;
        };
        $scope.$on('areaBeaconUpdate', function(event, beaconDatas) {
          var newAreaToNavigateTo;
          if (!isTransitionInProgress) {
            newAreaToNavigateTo = getAreaToNavigateTo(beaconDatas);
            if (newAreaToNavigateTo !== void 0) {
              if ($scope.areaToNavigate === void 0) {
                isTransitionInProgress = true;
                $scope.areaToNavigate = newAreaToNavigateTo;
                slideIn();
                return doAfterTransition((function() {
                  return isTransitionInProgress = false;
                }));
              } else if (newAreaToNavigateTo.key !== $scope.areaToNavigate.key) {
                isTransitionInProgress = true;
                slideAway();
                return doAfterTransition(function() {
                  $scope.areaToNavigate = newAreaToNavigateTo;
                  slideIn();
                  return doAfterTransition((function() {
                    return isTransitionInProgress = false;
                  }));
                });
              }
            } else {
              if (newAreaToNavigateTo === void 0 && $scope.currentAreaKey === "home") {
                isTransitionInProgress = true;
                setAreaToNavigateToHome();
                slideIn();
                return doAfterTransition((function() {
                  return isTransitionInProgress = false;
                }));
              }
            }
          }
        });
        setAreaToNavigateToHome = function() {
          $scope.areaToNavigate = {};
          $scope.areaToNavigate.key = "home";
          return $scope.areaToNavigate.gotoMessage = "Begib dich in den unteren Stock um den Rundgang zu starten!";
        };
        getAreaToNavigateTo = function(beaconDatas) {
          var nearestArea, secondNearestArea;
          if (beaconDatas[0] != null) {
            nearestArea = DataStore.getAreaByBeaconData(beaconDatas[0]);
            if ($scope.currentAreaKey !== nearestArea.key) {
              return nearestArea;
            } else {
              if (beaconDatas[1] != null) {
                secondNearestArea = DataStore.getAreaByBeaconData(beaconDatas[1]);
                return secondNearestArea;
              }
            }
          }
          return void 0;
        };
        doAfterTransition = function(fn) {
          return $timeout(fn, 2000);
        };
        slideAway = function() {
          return $scope.transitionClass = "area-slider-slideaway";
        };
        return slideIn = function() {
          return $scope.transitionClass = "area-slider-slidein";
        };
      }
    };
  };

  PaperChase.directive("areaSlider", ["$timeout", "NavigationService", "DataStore", f]);

}).call(this);

(function() {
  var backgroundSize, beaconHTML, beaconLocationScaling, boxSize, clientHTML, colors, containerHTML, f, scaling;

  f = function($scope, $ionicSideMenuDelegate, BeaconManager) {
    $ionicSideMenuDelegate.canDragContent(false);
    return BeaconManager.initialize();
  };

  PaperChase.controller("BeaconSimulatorCtrl", ["$scope", "$ionicSideMenuDelegate", "BeaconManager", f]);

  scaling = 1;

  backgroundSize = 1150 * scaling;

  beaconLocationScaling = 15 * scaling;

  containerHTML = "<div>\n  <div style=\"width: 100%; height: 100%; border: solid;\n              background-image: url(../img/groundplan.svg);\n              background-size: " + backgroundSize + "px;\n              background-repeat: no-repeat;\">\n  </div>\n</div>";

  boxSize = 15;

  clientHTML = "<p style=\"width: " + boxSize + "px; height: " + boxSize + "px; border: solid; border-width: 1px; background-color: rgba(44, 8, 254, 0.49)\"/>";

  beaconHTML = function(color) {
    return "<p style=\"width: " + boxSize + "px; height: " + boxSize + "px; border: solid; border-width: 1px; background-color: " + color + "; border-radius: " + boxSize + "px;\"/>";
  };

  colors = {
    "area_beacon": "rgba(0, 255, 68, 0.55)",
    "quest_beacon": "rgba(255, 0, 68, 0.55)"
  };

  f = function() {
    return {
      restrict: "E",
      replace: true,
      template: containerHTML,
      scope: {},
      link: function($scope, element) {
        var RandomBeaconData, container;
        RandomBeaconData = window.sharedRandomBeaconData;
        container = element.find("div");
        return RandomBeaconData.getBeacons().then(function(beacons) {
          var beacon, clientPosition, draggable, x, y, _i, _len;
          for (_i = 0, _len = beacons.length; _i < _len; _i++) {
            beacon = beacons[_i];
            draggable = angular.element(beaconHTML(colors[beacon.kind]));
            x = beacon.position.x * beaconLocationScaling;
            y = beacon.position.y * beaconLocationScaling;
            draggable.css({
              left: "" + x + "px",
              top: "" + y + "px",
              position: "absolute"
            });
            draggable.html(beacon.areaKey);
            container.append(draggable);
          }
          clientPosition = RandomBeaconData.getClientPosition();
          draggable = angular.element(clientHTML);
          container.append(draggable);
          x = clientPosition.x * beaconLocationScaling;
          y = clientPosition.y * beaconLocationScaling;
          draggable.css({
            left: "" + x + "px",
            top: "" + y + "px",
            position: "absolute"
          });
          draggable = new Draggabilly(draggable[0], {
            containment: container[0]
          });
          return draggable.on("dragMove", function(draggable, event, pointer) {
            clientPosition.x = draggable.position.x / beaconLocationScaling;
            return clientPosition.y = draggable.position.y / beaconLocationScaling;
          });
        });
      }
    };
  };

  PaperChaseBeaconSimulator.directive("beaconSimulator", [f]);

}).call(this);

(function() {
  var BoundingBox, ctrl, draggable, draggablesContainer;

  BoundingBox = (function() {
    function BoundingBox(id, element) {
      var el;
      this.id = id;
      el = element[0];
      this.top = el.offsetTop;
      this.right = el.offsetLeft + el.offsetWidth;
      this.bottom = el.offsetTop + el.offsetHeight;
      this.left = el.offsetLeft;
      this.height = el.offsetHeight;
      this.width = el.offsetWidth;
      this.center = {
        x: this.left + this.width / 2,
        y: this.top + this.height / 2
      };
      this.element = element;
    }

    BoundingBox.prototype.liesWithin = function(coordinates) {
      var _ref, _ref1;
      if ((this.left < (_ref = coordinates.x) && _ref < this.right) && (this.top < (_ref1 = coordinates.y) && _ref1 < this.bottom)) {
        return true;
      }
      return false;
    };

    BoundingBox.prototype.getCenter = function() {
      return this.center;
    };

    return BoundingBox;

  })();

  ctrl = PaperChase.controller("DraggablesCtrl", function($scope) {
    var boundingBoxes, onDragCallback, onReleaseCallback, onTouchCallback;
    boundingBoxes = [];
    onTouchCallback = void 0;
    onDragCallback = void 0;
    onReleaseCallback = void 0;
    this.registerBoundingBox = function(boundingBox) {
      return boundingBoxes.push(boundingBox);
    };
    this.entryForCoordinates = function(coordinates) {
      var boundingBox, _i, _len;
      for (_i = 0, _len = boundingBoxes.length; _i < _len; _i++) {
        boundingBox = boundingBoxes[_i];
        if (boundingBox.liesWithin(coordinates)) {
          return boundingBox;
        }
      }
    };
    this.getBoundingBoxById = function(id) {
      var boundingBox, _i, _len;
      for (_i = 0, _len = boundingBoxes.length; _i < _len; _i++) {
        boundingBox = boundingBoxes[_i];
        if (boundingBox.id === id) {
          return boundingBox;
        }
      }
    };
    this._onTouch = function($event, coordinates, boundingBox) {
      return onTouchCallback($event, coordinates, boundingBox);
    };
    this.onTouch = function(callback) {
      return onTouchCallback = callback;
    };
    this._onDrag = function($event, coordinates, boundingBox) {
      return onDragCallback($event, coordinates, boundingBox);
    };
    this.onDrag = function(callback) {
      return onDragCallback = callback;
    };
    this._onRelease = function($event, coordinates, boundingBox) {
      return onReleaseCallback($event, coordinates, boundingBox);
    };
    return this.onRelease = function(callback) {
      return onReleaseCallback = callback;
    };
  });

  draggable = function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div ng-transclude></div>",
      transclude: true,
      require: "^papDraggablesContainer",
      link: function($scope, $element, $attrs, Ctrl) {
        var bb;
        bb = new BoundingBox($attrs.id, $element);
        return Ctrl.registerBoundingBox(bb);
      }
    };
  };

  PaperChase.directive("papDraggable", [draggable]);

  draggablesContainer = function() {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      template: "<div style=\"height: 100%;\">\n  <div style=\"height: 100%;\"\n    on-touch=\"onTouch($event)\"\n    on-drag=\"onDrag($event)\"\n    on-release=\"onRelease($event)\"\n    ng-transclude>\n  </div>\n</div>",
      controller: "DraggablesCtrl",
      require: "",
      link: function($scope, $element, $attrs, Ctrl) {
        var getBoundingBox, getCoordinates, getVerticalOffset, verticalOffset;
        verticalOffset = void 0;
        getVerticalOffset = function(element) {
          var yPosition;
          if (verticalOffset != null) {
            return verticalOffset;
          }
          element = element.offsetParent;
          yPosition = 0;
          while (element) {
            yPosition += element.offsetTop - element.scrollTop + element.clientTop;
            element = element.offsetParent;
          }
          return verticalOffset = yPosition;
        };
        getCoordinates = function($event) {
          var c;
          c = ionic.tap.pointerCoord($event.gesture.srcEvent);
          c.y -= getVerticalOffset($element[0]);
          return c;
        };
        getBoundingBox = function(coordinates) {
          return Ctrl.entryForCoordinates(coordinates);
        };
        $scope.onTouch = function($event) {
          var coordinates;
          coordinates = getCoordinates($event);
          return Ctrl._onTouch($event, coordinates, getBoundingBox(coordinates));
        };
        $scope.onDrag = function($event) {
          var coordinates;
          coordinates = getCoordinates($event);
          return Ctrl._onDrag($event, coordinates, getBoundingBox(coordinates));
        };
        return $scope.onRelease = function($event) {
          var coordinates;
          coordinates = getCoordinates($event);
          return Ctrl._onRelease($event, coordinates, getBoundingBox(coordinates));
        };
      }
    };
  };

  PaperChase.directive("papDraggablesContainer", [draggablesContainer]);

}).call(this);

(function() {
  PaperChase.directive('dynamic', function($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function(scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(html) {
          if (html != null) {
            ele.html(html.toString());
            $compile(ele.contents())(scope);
          }
        });
      }
    };
  });

}).call(this);

(function() {
  var f;

  f = function(DataStore) {
    return {
      restrict: "E",
      template: "<img ng-src='{{::getImageUrl()}}'>",
      scope: {
        imageId: "@"
      },
      link: function($scope) {
        return $scope.getImageUrl = function() {
          if ($scope.imageId) {
            return DataStore.getImages()[parseInt($scope.imageId)];
          }
        };
      }
    };
  };

  PaperChase.directive("imageLoad", ["DataStore", f]);

}).call(this);

(function() {
  var f;

  f = function($rootScope) {
    return {
      restrict: 'E',
      template: "<div class='pap-load-overlay' ng-class='hideClass' />",
      scope: true,
      link: function($scope) {
        $scope.hideClass = "pap-load-overlay-show";
        $rootScope.$on("$ionicView.enter", function() {
          return $scope.hideClass = "pap-load-overlay-hide";
        });
        return $scope.$on("$ionicView.enter", function() {
          return $scope.hideClass = "pap-load-overlay-hide";
        });
      }
    };
  };

  PaperChase.directive("overlay", ["$rootScope", f]);

}).call(this);

(function() {
  var f;

  f = function() {
    return {
      restrict: "E",
      replace: true,
      template: "<button\n  class=\"button button-block button-positive pap-quiz-button\"\n  ng-click=\"checkAnswer()\"\n  ng-class=\"{'button-assertive': receivedWrongAnswer}\">\n  {{buttonLabel}}\n</button>",
      scope: {
        buttonState: "=",
        checkQuizCallback: "=",
        giveSecondChance: "=",
        customSuccessfulMessage: "="
      },
      link: function($scope, $element, $attrs) {
        var updateButton;
        updateButton = function(positive) {
          if ($scope.buttonState) {
            $scope.receivedWrongAnswer = false;
            return $scope.buttonLabel = "Prüfen";
          } else {
            $scope.receivedWrongAnswer = true;
            return $scope.buttonLabel = "Versuchs nochmal!";
          }
        };
        $scope.buttonState = true;
        updateButton();
        $scope.$watch("buttonState", function(buttonState) {
          return updateButton();
        });
        $scope.checkAnswer = function() {
          if ($scope.checkQuizCallback()) {
            return $scope.endQuiz(true);
          } else {
            if ($scope.giveSecondChance) {
              $scope.buttonState = false;
              return updateButton();
            } else {
              return $scope.endQuiz(false);
            }
          }
        };
        return $scope.endQuiz = function(successfully) {
          var args;
          args = {};
          args.successfully = successfully;
          if (successfully && ($scope.customSuccessfulMessage != null)) {
            args.customSuccessfulMessage = $scope.customSuccessfulMessage;
          }
          return $scope.$emit("quizCompleted", args);
        };
      }
    };
  };

  PaperChase.directive("papQuizCheckAnswerButton", [f]);

}).call(this);

(function() {
  PaperChase.directive("papQuizImageregion", [
    "$timeout", "DataStore", function($timeout, DataStore) {
      return {
        restrict: 'E',
        templateUrl: 'templates/quizzes/imageregion.html',
        scope: {
          data: "="
        },
        link: function($scope) {
          var quizFinished;
          $timeout(function() {
            return $('img[usemap]').rwdImageMaps();
          });
          $scope.areas = [
            {
              coords: $scope.data.coords
            }
          ];
          $scope.getImageSrc = function() {
            if ($scope.showCorrect) {
              return DataStore.getImages()[$scope.data.imageSolvedId];
            } else {
              return DataStore.getImages()[$scope.data.imageId];
            }
          };
          $scope.areaClick = function(idx) {
            if (!$scope.showCorrect) {
              if (idx !== -1) {
                $scope.showCorrect = true;
                $scope.showWrong = false;
                return $timeout(quizFinished, 2000);
              } else {
                $scope.showWrong = true;
                return $timeout((function() {
                  return $scope.showWrong = false;
                }), 2000);
              }
            }
          };
          return quizFinished = function() {
            var args;
            args = {
              successfully: true
            };
            return $scope.$emit("quizCompleted", args);
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  PaperChase.directive("papQuizMultiplechoice", [
    "$http", "DataStore", function($http, DataStore) {
      return {
        restrict: 'E',
        templateUrl: 'templates/quizzes/multiplechoice.html',
        scope: {
          data: "="
        },
        link: function($scope) {
          var prepareData;
          prepareData = function() {
            var v, _i, _len, _ref, _results;
            $scope.options = [];
            $scope.question = $scope.data.question;
            _ref = $scope.data.answers;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              v = _ref[_i];
              if ($scope.data.type === "text") {
                _results.push($scope.options.push({
                  idx: v.idx,
                  data: v.text
                }));
              } else if ($scope.data.type === "image") {
                _results.push($scope.options.push({
                  idx: v.idx,
                  data: "<image-load image-id='" + v.imageId + "'/>"
                }));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          prepareData();
          return $scope.checkAnswer = function() {
            return parseInt($scope.choice) === parseInt($scope.data.correctAnswer);
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  var Line, f, papHeight, papLinePath, papWidth, shuffleArray, subCtrl;

  Line = (function() {
    function Line(x1, y1, x2, y2) {
      var h, w, xs, ys;
      xs = [x1, x2];
      xs.sort;
      ys = [y1, y2];
      ys.sort;
      this.x1 = xs[0];
      this.y1 = ys[0];
      this.x2 = xs[1];
      this.y2 = ys[1];
      w = (this.x2 - this.x1) / 2;
      h = (this.y2 - this.y1) / 2;
      this.mx = this.my = 0;
      if (!(w === 0 && h === 0)) {
        this.mx = this.x1 + w + 30;
        this.my = this.y1 + h + 30;
      }
    }

    return Line;

  })();

  shuffleArray = function(array) {
    var i, j, temp;
    i = array.length - 1;
    while (i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i--;
    }
    return array;
  };

  papLinePath = function() {
    return {
      restrict: "A",
      scope: {
        config: "=papLinePath"
      },
      link: function($scope, $element, $attrs) {
        return $scope.$watch("config", function(line) {
          if (line != null) {
            return $element.attr("d", "M " + line.x1 + " " + line.y1 + " Q " + line.mx + " " + line.my + " " + line.x2 + " " + line.y2);
          } else {
            return $element.attr("d", "");
          }
        });
      }
    };
  };

  PaperChase.directive("papLinePath", [papLinePath]);

  papHeight = function() {
    return {
      restrict: "A",
      link: function($scope, $element, $attrs) {
        return $element.height($attrs.papHeight);
      }
    };
  };

  PaperChase.directive("papHeight", [papHeight]);

  papWidth = function() {
    return {
      restrict: "A",
      link: function($scope, $element, $attrs) {
        return $element.width($attrs.papWidth);
      }
    };
  };

  PaperChase.directive("papWidth", [papWidth]);

  subCtrl = function($window, DataStore) {
    return {
      restrict: "E",
      require: "^papDraggablesContainer",
      scope: true,
      link: function($scope, $element, $attrs, Ctrl) {
        var addAssignment, srcId, srcPoint, visualizeAssignments;
        $scope.assignments = [];
        $scope.buttonState = void 0;
        $scope.show = false;
        addAssignment = function(srcId, dstId) {
          var assignment, assignments, i, ids, _i, _len, _ref;
          $scope.buttonState = true;
          assignments = [];
          _ref = $scope.assignments;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            assignment = _ref[i];
            if (!(assignment.srcId === srcId || assignment.srcId === dstId || assignment.dstId === srcId || assignment.dstId === dstId)) {
              assignments.push(assignment);
            }
          }
          ids = [srcId, dstId];
          ids.sort();
          assignments.push({
            srcId: ids[0],
            dstId: ids[1]
          });
          $scope.show = false;
          if (assignments.length === $scope.listA.values.length) {
            $scope.show = true;
          }
          return $scope.assignments = assignments;
        };
        srcId = void 0;
        srcPoint = void 0;
        visualizeAssignments = function() {
          var assignment, dst, src, visualizedAssignments, _i, _len, _ref;
          visualizedAssignments = [];
          _ref = $scope.assignments;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            assignment = _ref[_i];
            src = Ctrl.getBoundingBoxById(assignment.srcId).getCenter();
            dst = Ctrl.getBoundingBoxById(assignment.dstId).getCenter();
            visualizedAssignments.push(new Line(src.x, src.y, dst.x, dst.y));
          }
          return $scope.visualizedAssignments = visualizedAssignments;
        };
        $scope.line = null;
        $scope.checkAnswer = function() {
          var assignment, _i, _len, _ref;
          if ($scope.assignments.length !== $scope.listA.values.length) {
            return false;
          }
          _ref = $scope.assignments;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            assignment = _ref[_i];
            if (assignment.srcId.replace("l") !== assignment.dstId.replace("r")) {
              return false;
            }
          }
          return true;
        };
        $scope.getBgImageFor = function(index) {
          var url;
          url = DataStore.getImages()[$scope.listB.values[index].mediumId];
          return {
            "background-image": "url('" + url + "')"
          };
        };
        $scope.calculateRowHeight = function() {
          return (screen.height - 150) / $scope.listA.values.length;
        };
        Ctrl.onTouch(function($event, coordinates, boundingBox) {
          if (boundingBox) {
            $scope.show = false;
            srcId = boundingBox.id;
            return srcPoint = boundingBox.getCenter();
          }
        });
        Ctrl.onDrag(function($event, coordinates, boundingBox) {
          if (srcId) {
            return $scope.line = new Line(srcPoint.x, srcPoint.y, coordinates.x, coordinates.y);
          }
        });
        return Ctrl.onRelease(function($event, coordinates, boundingBox) {
          var dstId;
          if ((srcId != null) && (boundingBox != null) && srcId !== boundingBox.id) {
            dstId = boundingBox.id;
            addAssignment(srcId, dstId);
            visualizeAssignments();
          }
          srcId = void 0;
          srcPoint = void 0;
          return $scope.line = null;
        });
      }
    };
  };

  PaperChase.directive("papQuizAssignSubCtrl", ["$window", "DataStore", subCtrl]);

  f = function($compile) {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "templates/quizzes/assign.html",
      scope: {
        listA: "=",
        listB: "=",
        question: "="
      },
      link: function($scope, $element, $attrs) {
        shuffleArray($scope.listA.values);
        return shuffleArray($scope.listB.values);
      }
    };
  };

  PaperChase.directive("papQuizAssign", ["$compile", f]);

}).call(this);

(function() {
  var f;

  f = function($ionicModal, Util, DataStore) {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "templates/quizzes/order.html",
      scope: {
        list: "=",
        question: "="
      },
      link: function($scope, $element, $attrs) {
        var correctAnswers, resetCorrectAnswers;
        Util.shuffleArray($scope.list);
        $scope.buttonState = void 0;
        correctAnswers = [];
        resetCorrectAnswers = function() {
          var i, item, _i, _len, _ref, _results;
          _ref = $scope.list;
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            item = _ref[i];
            _results.push(correctAnswers[i] = true);
          }
          return _results;
        };
        resetCorrectAnswers();
        $scope.checkAnswer = function() {
          var entry, i, previousValue, somethingIsWrong, _i, _len, _ref;
          previousValue = -1;
          somethingIsWrong = false;
          _ref = $scope.list;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            entry = _ref[i];
            if (entry.idx !== i) {
              somethingIsWrong = true;
            }
            correctAnswers[i] = entry.idx === i;
            previousValue = entry.idx;
          }
          return !somethingIsWrong;
        };
        $scope.options = {
          containment: "parent",
          update: function() {
            $scope.buttonState = true;
            return resetCorrectAnswers();
          }
        };
        $ionicModal.fromTemplateUrl("templates/dinomodal.html", {
          scope: $scope,
          animation: "slide-in-up"
        }).then(function(modal) {
          return $scope.modal = modal;
        });
        $scope.openModal = function(item) {
          var url;
          url = DataStore.getImages()[item.mediumId];
          $scope.imageSrc = url;
          $scope.caption_long = item.captionLong;
          return $scope.modal.show();
        };
        $scope.closeModal = function() {
          return $scope.modal.hide();
        };
        $scope.getCorrectAnswerIndicator = function(index) {
          return !correctAnswers[index];
        };
        return $scope.getBgImageFor = function(item) {
          var url;
          url = DataStore.getImages()[item.mediumId];
          return {
            "background-image": "url('" + url + "')"
          };
        };
      }
    };
  };

  PaperChase.directive("papQuizOrder", ["$ionicModal", "Util", "DataStore", f]);

}).call(this);

(function() {
  PaperChase.directive("papQuizTruefalse", [
    "$http", "$ionicSlideBoxDelegate", "$ionicPopup", "$timeout", "NavigationService", function($http) {
      return {
        restrict: 'E',
        templateUrl: 'templates/quizzes/truefalse.html',
        scope: {
          questionsRaw: "="
        },
        controller: function($scope, $ionicSlideBoxDelegate, $ionicPopup, $timeout, NavigationService) {
          var countCorrectAnswers, getCorrectPercentage, isLastQuestion, quizFinished, shuffle;
          $scope.expectedPercentageToPass = 66;
          $scope.showPager = true;
          shuffle = function(array) {
            var currentIndex, randomIndex, temporaryValue;
            currentIndex = array.length;
            temporaryValue = void 0;
            randomIndex = void 0;
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array;
          };
          $scope.$on("quizSolved", function(event, data) {
            if (data.correct) {
              countCorrectAnswers += 1;
            }
            $scope.percentage = getCorrectPercentage();
            if (!isLastQuestion()) {
              return $scope.slide();
            } else {
              return quizFinished();
            }
          });
          $scope.slide = function() {
            return $ionicSlideBoxDelegate.next();
          };
          $scope.slideToStart = function() {
            return $ionicSlideBoxDelegate.slide(0, 2000);
          };
          $scope.updateSlider = function() {
            if ($scope.questions.length <= 2) {
              $scope.showPager = false;
            }
            $ionicSlideBoxDelegate.update();
            return $ionicSlideBoxDelegate.enableSlide(false);
          };
          $scope.prepareQuestions = function(rawQuestionData) {
            var i, question, _ref;
            _ref = rawQuestionData.questions;
            for (i in _ref) {
              question = _ref[i];
              question.id = i;
              if (question.questionText == null) {
                question.questionText = rawQuestionData.defaultQuestionText;
              }
              if (question.trueAnswer == null) {
                question.trueAnswer = rawQuestionData.trueAnswerText;
              }
              if (question.falseAnswer == null) {
                question.falseAnswer = rawQuestionData.falseAnswerText;
              }
              if (question.wrongFeedback == null) {
                if (rawQuestionData.defaultWrongFeedback != null) {
                  question.wrongFeedback = rawQuestionData.defaultWrongFeedback;
                } else {
                  question.wrongFeedback = "Falsch!";
                }
              }
              if (question.correctFeedback == null) {
                if (rawQuestionData.defaultCorrectFeedback != null) {
                  question.correctFeedback = rawQuestionData.defaultCorrectFeedback;
                } else {
                  question.correctFeedback = "Richtig!";
                }
              }
            }
            rawQuestionData.questions = shuffle(rawQuestionData.questions);
            return rawQuestionData.questions;
          };
          $scope.questions = $scope.prepareQuestions($scope.questionsRaw);
          countCorrectAnswers = 0;
          getCorrectPercentage = function() {
            return 100 / $scope.questions.length * countCorrectAnswers;
          };
          quizFinished = function() {
            var args;
            args = {
              successfully: getCorrectPercentage() >= $scope.expectedPercentageToPass,
              customSuccessfulMessage: "Gut gemacht! Du hast " + countCorrectAnswers + " von " + $scope.questions.length + " Fragen richtig Beantwortet"
            };
            return $scope.$emit("quizCompleted", args);
          };
          isLastQuestion = function() {
            return $ionicSlideBoxDelegate.currentIndex() >= $scope.questions.length - 1;
          };
        }
      };
    }
  ]);

  PaperChase.directive("papQuizTruefalseQuestion", [
    "$timeout", "$cordovaVibration", function($timeout, $cordovaVibration) {
      return {
        restrict: 'E',
        templateUrl: 'templates/quizzes/truefalsequestion.html',
        scope: {
          question: "="
        },
        link: function($scope) {
          var disableButtons, feedBackShowTime, setFeedbackText, setStyles;
          feedBackShowTime = 1000;
          $scope.isSolved = false;
          $scope.submitAnswer = function(answer) {
            var emitCall;
            $scope.isSolved = true;
            $scope.correct = answer === JSON.parse($scope.question.correctAnswer);
            setFeedbackText($scope.correct);
            disableButtons(answer);
            emitCall = function() {
              return $scope.$emit("quizSolved", {
                'questionId': $scope.question.id,
                'correct': $scope.correct
              });
            };
            return $timeout(emitCall, feedBackShowTime);
          };
          setFeedbackText = function(correct) {
            if (correct) {
              return $scope.feedbackText = $scope.question.correctFeedback;
            } else {
              try {
                $cordovaVibration.vibrate(400);
              } catch (_error) {}
              return $scope.feedbackText = $scope.question.wrongFeedback;
            }
          };
          disableButtons = function(answer) {
            $scope.trueButtonClass = [];
            $scope.falseButtonClass = [];
            $scope.trueButtonClass.push("disabled");
            $scope.falseButtonClass.push("disabled");
            if (answer) {
              return $scope.trueButtonClass.push("button-positive");
            } else {
              return $scope.falseButtonClass.push("button-positive");
            }
          };
          setStyles = function() {
            if ($scope.question.questionImageSrc != null) {
              return $scope.questionClass = "";
            } else {
              return $scope.questionClass = "question-textonly";
            }
          };
          setStyles();
        }
      };
    }
  ]);

}).call(this);

(function() {
  PaperChase.factory("Area", function() {
    var Area;
    return Area = (function() {
      function Area(rawData) {
        this.id = rawData.id;
        this.key = rawData.key;
        this.title = rawData.title;
        this.gotoMessage = rawData.gotoMessage;
        this.hintText = rawData.hintText;
        this.hintImagePath = rawData.hintImagePath;
        this.areaBeaconId = rawData.areaBeaconId;
        this.questBeaconId = rawData.questBeaconId;
        this.challenge = rawData.challenge;
        this.contents = rawData.contents;
        this.styles = rawData.styles;
      }

      return Area;

    })();
  });

}).call(this);

(function() {
  PaperChase.factory("Beacon", function() {
    var Beacon;
    return Beacon = (function() {
      function Beacon(rawData) {
        this.uuid = rawData.uuid;
        this.id = rawData.id;
        this.device_id = rawData.deviceId;
        this.major = rawData.major;
        this.minor = rawData.minor;
        this.kind = rawData.kind;
      }

      return Beacon;

    })();
  });

}).call(this);

(function() {
  PaperChase.factory("BeaconData", function() {
    var BeaconData;
    return BeaconData = (function() {
      function BeaconData(rawData) {
        var _ref;
        this.id = rawData.minor;
        this.uuid = rawData.uuid;
        this.major = rawData.major;
        this.minor = rawData.minor;
        this.proximity = (_ref = rawData.proximity) != null ? _ref.replace("Proximity", "").toLowerCase() : void 0;
        this.accuracy = rawData.accuracy;
        this.rssi = rawData.rssi;
        this.tx = rawData.tx;
      }

      return BeaconData;

    })();
  });

}).call(this);

(function() {
  var f;

  f = function() {
    var beaconDataRecords, compareByAccuracy, filterOutTooOldValues, getAccuracyMedian, maxHistoryLength, maxMilliseconds;
    beaconDataRecords = {};
    maxHistoryLength = 5;
    maxMilliseconds = 5000;
    compareByAccuracy = function(beaconDataA, beaconDataB) {
      if (beaconDataA.beaconData.accuracy < beaconDataB.beaconData.accuracy) {
        return -1;
      }
      if (beaconDataA.beaconData.accuracy > beaconDataB.beaconData.accuracy) {
        return 1;
      }
      return 0;
    };
    getAccuracyMedian = function(records) {
      var middle, recordsCopy;
      recordsCopy = records.slice();
      recordsCopy.sort(compareByAccuracy);
      middle = Math.round((recordsCopy.length - 1) / 2);
      return recordsCopy[middle].beaconData;
    };
    filterOutTooOldValues = function(records) {
      return records.filter(function(beaconDataRecord) {
        return maxMilliseconds > Date.now() - beaconDataRecord.timestamp;
      });
    };
    return {
      configure: function(historyLength, milliseconds) {
        maxHistoryLength = historyLength;
        return maxMilliseconds = milliseconds;
      },
      get: function(beaconId) {
        if ((beaconDataRecords[beaconId] == null) || beaconDataRecords[beaconId].length === 0) {
          return void 0;
        }
        beaconDataRecords[beaconId] = filterOutTooOldValues(beaconDataRecords[beaconId]);
        if (beaconDataRecords[beaconId].length === 0) {
          return void 0;
        }
        return getAccuracyMedian(beaconDataRecords[beaconId]);
      },
      set: function(beaconData, timestamp) {
        if (beaconData == null) {
          return;
        }
        if (beaconData.accuracy < 0) {
          return;
        }
        if (beaconDataRecords[beaconData.id] == null) {
          beaconDataRecords[beaconData.id] = [];
        }
        if (beaconDataRecords[beaconData.id].length === maxHistoryLength) {
          beaconDataRecords[beaconData.id] = beaconDataRecords[beaconData.id].slice(1, maxHistoryLength);
        }
        beaconDataRecords[beaconData.id].push({
          beaconData: beaconData,
          timestamp: timestamp
        });
      }
    };
  };

  PaperChase.service("AccuracyFilter", [f]);

}).call(this);

(function() {
  var f;

  f = function(DataStore, LocalStorage, $q) {
    var getCompletedQuests;
    getCompletedQuests = function() {
      return LocalStorage.getObject("challengeCompletions");
    };
    return {
      saveQuestCompletion: function(areaKey) {
        var challengeCompletions;
        challengeCompletions = getCompletedQuests();
        challengeCompletions[areaKey] = true;
        return LocalStorage.setObject("challengeCompletions", challengeCompletions);
      },
      isQuestCompleted: function(areaKey) {
        var completed;
        completed = getCompletedQuests()[areaKey];
        return (completed != null) && completed;
      },
      getCompletedQuests: function() {
        return getCompletedQuests();
      },
      reset: function() {
        return LocalStorage.setObject("challengeCompletions", {});
      },
      allQuetsCompleted: function() {
        var deferred;
        deferred = $q.defer();
        DataStore.awaitLoadCompletion().then(function() {
          var challengeCompletions, completed, key, _i, _len, _ref;
          challengeCompletions = getCompletedQuests();
          completed = true;
          _ref = DataStore.getAreaKeys();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            if (challengeCompletions[key] == null) {
              completed = false;
              break;
            }
          }
          return deferred.resolve(completed);
        });
        return deferred.promise;
      }
    };
  };

  PaperChase.service("AppData", ["DataStore", "LocalStorage", "$q", f]);

}).call(this);

(function() {
  var mockedBeaconListener;

  mockedBeaconListener = function($interval, RandomBeaconData) {
    var interval, monitoringCallbacks, rangingCallbacks;
    rangingCallbacks = [];
    monitoringCallbacks = [];
    interval = function() {
      var callback, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rangingCallbacks.length; _i < _len; _i++) {
        callback = rangingCallbacks[_i];
        _results.push(callback(RandomBeaconData.getData()));
      }
      return _results;
    };
    return {
      registerForRanging: function(rangingCallback) {
        return rangingCallbacks.push(rangingCallback);
      },
      registerForMonitoring: function(monitoringCallback) {
        return monitoringCallbacks.push(monitoringCallback);
      },
      startRanging: function(beacons) {
        RandomBeaconData.initialize(beacons);
        return $interval(interval, 50);
      }
    };
  };

  PaperChase.service("BeaconListener", ["$interval", "RandomBeaconData", mockedBeaconListener]);

}).call(this);

(function() {
  var currentSingleBeaconRangingData, f;

  currentSingleBeaconRangingData = null;

  f = function(BeaconListener, AccuracyFilter, BeaconData, $rootScope, $interval) {
    var beaconGroups, initializeInterval, int, interval, notifyMonitoring, notifyRanging, singleBeaconRangingCallback, singleBeaconRangingId, sortByKey;
    beaconGroups = {};
    AccuracyFilter.configure(15, 5000);
    notifyRanging = function(rangedBeacons) {
      var beaconData, rangedBeacon, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rangedBeacons.length; _i < _len; _i++) {
        rangedBeacon = rangedBeacons[_i];
        beaconData = new BeaconData(rangedBeacon);
        AccuracyFilter.set(beaconData, Date.now());
        if (beaconData.minor + "" === singleBeaconRangingId + "") {
          if (typeof singleBeaconRangingCallback !== "undefined" && singleBeaconRangingCallback !== null) {
            _results.push(singleBeaconRangingCallback(beaconData));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    notifyMonitoring = function(region, state) {};
    sortByKey = function(array, key) {
      return array.sort(function(a, b) {
        var x, y;
        x = a[key];
        y = b[key];
        if (x < y) {
          return -1;
        } else if (x > y) {
          return 1;
        } else {
          return 0;
        }
      });
    };
    interval = function() {
      var beacon, beaconDatas, beaconDatasSorted, k, v, _i, _len, _ref, _results;
      _results = [];
      for (k in beaconGroups) {
        v = beaconGroups[k];
        beaconDatas = [];
        if (v.sendBroadcast) {
          _ref = v.beacons;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            beacon = _ref[_i];
            beaconDatas.push(AccuracyFilter.get(beacon.minor));
          }
          beaconDatasSorted = sortByKey(beaconDatas, 'accuracy');
          _results.push($rootScope.$broadcast("" + k + "BeaconUpdate", beaconDatasSorted));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    int = void 0;
    initializeInterval = function() {
      return int = $interval(interval, window.BeaconManagerInterval);
    };
    singleBeaconRangingId = null;
    singleBeaconRangingCallback = null;
    return {
      registerSingleBeaconRanging: function(id, callback) {
        singleBeaconRangingId = id;
        return singleBeaconRangingCallback = callback;
      },
      deregisterSingleBeaconRanging: function() {
        singleBeaconRangingId = null;
        return singleBeaconRangingCallback = null;
      },
      resetInterval: function() {
        $interval.cancel(int);
        return initializeInterval();
      },
      registerBeacons: function(key, _beacons, _sendBroadcast) {
        return beaconGroups[key] = {
          beacons: _beacons,
          sendBroadcast: _sendBroadcast
        };
      },
      start: function() {
        var compoundBeacons, i, k, v, _i, _len, _ref;
        compoundBeacons = [];
        for (k in beaconGroups) {
          v = beaconGroups[k];
          _ref = v.beacons;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            compoundBeacons.push(i);
          }
        }
        BeaconListener.registerForRanging(notifyRanging);
        BeaconListener.startRanging(compoundBeacons);
        return initializeInterval();
      }
    };
  };

  PaperChase.service("BeaconManager", ["BeaconListener", "AccuracyFilter", "BeaconData", "$rootScope", "$interval", f]);

}).call(this);

(function() {
  var f;

  f = function($q, RestApi, Beacon, Area) {
    var areas, beacons, deferred, images, initialize, loadCompleted, loadIntoModel;
    deferred = $q.defer();
    loadCompleted = false;
    areas = void 0;
    beacons = void 0;
    images = void 0;
    loadIntoModel = function(list, Model) {
      var item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        _results.push(new Model(item));
      }
      return _results;
    };
    initialize = function() {
      RestApi.getBeacons().then(function(data) {
        beacons = loadIntoModel(data, Beacon);
      }).then(function() {
        return RestApi.getAreas().then(function(data) {
          areas = loadIntoModel(data, Area);
        }).then(function() {
          return RestApi.getImages().then(function(data) {
            images = data;
            deferred.resolve();
            loadCompleted = true;
          });
        });
      });
    };
    return {
      awaitLoadCompletion: function() {
        return deferred.promise;
      },
      initialize: function() {
        return initialize();
      },
      getBeacons: function() {
        return beacons;
      },
      getAreas: function() {
        return areas;
      },
      getImages: function() {
        return images;
      },
      getAreaKeys: function() {
        var area, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = areas.length; _i < _len; _i++) {
          area = areas[_i];
          _results.push(area.key);
        }
        return _results;
      },
      getBeaconById: function(id) {
        var beacon, _i, _len;
        for (_i = 0, _len = beacons.length; _i < _len; _i++) {
          beacon = beacons[_i];
          if (beacon.id === id) {
            return beacon;
          }
        }
      },
      getBeaconByMinor: function(minor) {
        var beacon, _i, _len;
        for (_i = 0, _len = beacons.length; _i < _len; _i++) {
          beacon = beacons[_i];
          if (beacon.minor + "" === minor + "") {
            return beacon;
          }
        }
      },
      getAreaByBeacon: function(beacon) {
        var area, _i, _len;
        if (beacon == null) {
          return;
        }
        for (_i = 0, _len = areas.length; _i < _len; _i++) {
          area = areas[_i];
          if (area.areaBeaconId + "" === beacon.id + "") {
            return area;
          }
        }
      },
      getAreaByQuestBeacon: function(beacon) {
        var area, _i, _len;
        if (beacon == null) {
          return;
        }
        for (_i = 0, _len = areas.length; _i < _len; _i++) {
          area = areas[_i];
          if (area.questBeaconId === beacon.id) {
            return area;
          }
        }
      },
      getAreaByBeaconData: function(beaconData) {
        var beacon;
        beacon = this.getBeaconByMinor(beaconData.minor);
        return this.getAreaByBeacon(beacon);
      },
      getAreaByKey: function(key) {
        var area, _i, _len;
        for (_i = 0, _len = areas.length; _i < _len; _i++) {
          area = areas[_i];
          if (area.key === key) {
            return area;
          }
        }
      },
      getContent: function(areaKey, contentId) {
        var area, content, _i, _len, _ref;
        area = this.getAreaByKey(areaKey);
        _ref = area.contents;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          content = _ref[_i];
          if (content.id === contentId) {
            return content;
          }
        }
      }
    };
  };

  PaperChase.service("DataStore", ["$q", "RestApi", "Beacon", "Area", f]);

}).call(this);

(function() {
  var f;

  f = function() {
    var _on;
    _on = false;
    return {
      isOn: function() {
        return _on;
      },
      switchDevModeOn: function() {
        return _on = !_on;
      }
    };
  };

  PaperChase.service("DevMode", [f]);

}).call(this);

(function() {
  var f;

  f = function() {
    return {
      getHomeTitle: function() {
        return "Home";
      }
    };
  };

  PaperChase.service("Dictionary", [f]);

}).call(this);

(function() {
  var f;

  f = function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || "{}");
      }
    };
  };

  PaperChase.service("LocalStorage", ["$window", f]);

}).call(this);

(function() {
  var f;

  f = function($location, $ionicViewSwitcher) {
    return {
      navigateTo: function(path) {
        return $location.path(decodeURIComponent(path));
      },
      navigateToStickerbook: function() {
        return this.navigateTo("/app/stickerbook");
      },
      navigateToHelp: function() {
        return this.navigateTo("/app/help");
      },
      navigateToSettings: function() {
        return this.navigateTo("/app/settings");
      },
      navigateToHome: function() {
        $ionicViewSwitcher.nextDirection("back");
        return $location.path("/app/home");
      },
      navigateToArea: function(areaKey, direction) {
        if (direction == null) {
          direction = "forward";
        }
        $ionicViewSwitcher.nextDirection(direction);
        return $location.path("/app/area/" + areaKey);
      },
      navigateToQuiz: function(areaKey) {
        return $location.path("/app/quiz/" + areaKey);
      }
    };
  };

  PaperChase.service("NavigationService", ["$location", "$ionicViewSwitcher", f]);

}).call(this);

(function() {
  var f;

  f = function(DataStore, PreviewSocket, $ionicPopup, $state) {
    var openCodeDialog;
    openCodeDialog = function() {
      return $ionicPopup.show({
        template: '<input type="text" id="code">',
        title: 'Code eingeben',
        subTitle: '',
        buttons: [
          {
            text: 'Cancel'
          }, {
            text: '<b>Bestätigen</b>',
            type: 'button-positive',
            onTap: function(e) {
              return PreviewSocket.emit("setMuseum", {
                "code": e.view.document.getElementById("code").value
              });
            }
          }
        ]
      });
    };
    return {
      init: function() {
        if (parent && parent.document && parent.document.museumId) {
          console.log("set museum", parent.document.museumId);
          PreviewSocket.emit("setMuseum", {
            "museumId": parent.document.museumId
          });
        } else {
          openCodeDialog();
        }
        return PreviewSocket.on("publishPreviewData", function(data) {
          var area;
          if (data.type === "area") {
            area = DataStore.getAreaByKey(data.id + "");
            area.title = data.data.name;
            area.styles.primaryColor = data.data.primaryColor;
            return $state.go("app.area", {
              "areaKey": data.id
            }, {
              reload: true
            });
          }
        });
      }
    };
  };

  PaperChase.service("PreviewService", ["DataStore", "PreviewSocket", "$ionicPopup", "$state", f]);

  PaperChase.factory('PreviewSocket', function(DataStore, socketFactory) {
    return socketFactory();
  });

}).call(this);

(function() {
  var Beacon, Counter, Point, bigAnomalyRange, bigAnomalyRangeHalf, f, smallAnomalyRange, smallAnomalyRangeHalf;

  Point = (function() {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    return Point;

  })();

  Beacon = (function() {
    function Beacon(id, uuid, major, minor, kind, position, areaKey) {
      this.id = id;
      this.uuid = uuid;
      this.major = major;
      this.minor = minor;
      this.kind = kind;
      this.position = position;
      this.areaKey = areaKey;
    }

    return Beacon;

  })();

  Counter = (function() {
    function Counter(max) {
      this.max = max;
      this.n = this.max;
    }

    Counter.prototype.incrementCounter = function() {
      return this.n = this.n % this.max + 1;
    };

    return Counter;

  })();

  smallAnomalyRange = 0.6;

  smallAnomalyRangeHalf = smallAnomalyRange / 2.0;

  bigAnomalyRange = 10.0;

  bigAnomalyRangeHalf = bigAnomalyRange / 2.0;

  f = function($q, DataStore) {
    var addBeacon, addBigAnomaly, addSmallAnomaly, beacons, calculateDistance, clientPosition, counter, deferred, getProximityForDistance, getRandomBeaconLocation, getRandomFloat, getRandomInt, randomizeDistance;
    beacons = [];
    deferred = $q.defer();
    clientPosition = null;
    counter = null;
    calculateDistance = function(from, to) {
      return Math.sqrt((to.x - from.x) * (to.x - from.x) + (to.y - from.y) * (to.y - from.y));
    };
    getRandomFloat = function(min, max) {
      return Math.random() * (max - min) + min;
    };
    getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    addSmallAnomaly = function(n) {
      return n;
      return n + (getRandomFloat(0, smallAnomalyRangeHalf) - smallAnomalyRange);
    };
    addBigAnomaly = function(n) {
      var max;
      return n;
      max = 3;
      if (getRandomInt(1, max) === max) {
        return n + (getRandomFloat(0, bigAnomalyRangeHalf) - bigAnomalyRange);
      } else {
        return n;
      }
    };
    randomizeDistance = function(clientPosition, beaconPosition) {
      var distance;
      distance = calculateDistance(clientPosition, beaconPosition);
      return distance;
    };
    getProximityForDistance = function(distance) {
      if (distance < 1) {
        return "ProximityImmediate";
      } else if (distance < 10) {
        return "ProximityNear";
      } else if (distance < 20) {
        return "ProximityFar";
      } else {
        return "ProximityUnknown";
      }
    };
    addBeacon = function(beacon) {
      return beacons.push(beacon);
    };
    getRandomBeaconLocation = function() {
      var x, y;
      x = getRandomInt(0, 50);
      y = getRandomInt(0, 50);
      return new Point(x, y);
    };
    return {
      initialize: function(_beacons) {
        var area, beacon, _i, _len;
        clientPosition = new Point(8, 9);
        for (_i = 0, _len = _beacons.length; _i < _len; _i++) {
          beacon = _beacons[_i];
          area = void 0;
          if (beacon.kind === "area_beacon") {
            area = DataStore.getAreaByBeacon(beacon);
          } else {
            area = DataStore.getAreaByQuestBeacon(beacon);
          }
          if (area) {
            addBeacon(new Beacon(beacon.id, beacon.uuid, beacon.major, beacon.minor, beacon.kind, getRandomBeaconLocation(), area.title));
          }
        }
        counter = new Counter(beacons.length);
        return deferred.resolve(beacons);
      },
      getClientPosition: function() {
        return clientPosition;
      },
      getBeacons: function() {
        return deferred.promise;
      },
      getData: function() {
        var beacon, data, randomizedDistance;
        beacon = beacons[counter.incrementCounter() - 1];
        randomizedDistance = randomizeDistance(clientPosition, beacon.position);
        data = [
          {
            proximity: getProximityForDistance(randomizedDistance),
            accuracy: randomizedDistance,
            rssi: 0,
            uuid: beacon.uuid,
            minor: beacon.minor,
            major: beacon.major,
            tx: -77
          }
        ];
        return data;
      }
    };
  };

  PaperChase.service("RandomBeaconData", ["$q", "DataStore", f]);

}).call(this);

(function() {
  var f;

  f = function($resource, $q) {
    var areaResource, baseUrl, beaconResource, imageResource;
    baseUrl = "http://localhost:3000/consume";
    beaconResource = $resource("" + baseUrl + "/beacons.json");
    areaResource = $resource("" + baseUrl + "/areas.json?locale=de");
    imageResource = $resource("" + baseUrl + "/images.json");
    return {
      getBeacons: function() {
        return beaconResource.query().$promise;
      },
      getAreas: function() {
        return areaResource.query().$promise;
      },
      getImages: function() {
        return imageResource.get().$promise;
      }
    };
  };

  PaperChase.service("RestApi", ["$resource", "$q", f]);

}).call(this);

(function() {
  var f;

  f = function($ionicHistory, NavigationService, DataStore, Dictionary) {
    return {
      getLastViewTitle: function() {
        if ($ionicHistory.backTitle() != null) {
          return $ionicHistory.backTitle();
        } else {
          return "Home";
        }
      },
      lastViewType: function() {
        var lastViewTitle;
        lastViewTitle = this.getLastViewTitle();
        if (lastViewTitle === Dictionary.getHomeTitle()) {
          return "home";
        } else {
          return "area";
        }
      },
      getBackButtonLabel: function() {
        var areaKey, currentArea, _ref;
        if (this.lastViewType() === "home") {
          return "Home";
        } else {
          areaKey = (_ref = $ionicHistory.backView()) != null ? _ref.stateParams.areaKey : void 0;
          currentArea = DataStore.getAreaByKey(areaKey);
          return currentArea.title;
        }
      },
      goBack: function() {
        var areaKey, _ref;
        if (this.lastViewType() === "home") {
          return NavigationService.navigateToHome();
        } else {
          areaKey = (_ref = $ionicHistory.backView()) != null ? _ref.stateParams.areaKey : void 0;
          return NavigationService.navigateToArea(areaKey, "back");
        }
      }
    };
  };

  PaperChase.service("StickerbookNavigation", ["$ionicHistory", "NavigationService", "DataStore", "Dictionary", f]);

}).call(this);

(function() {
  var f;

  f = function() {
    return {
      shuffleArray: function(array) {
        var i, j, temp;
        i = array.length - 1;
        while (i > 0) {
          j = Math.floor(Math.random() * (i + 1));
          temp = array[i];
          array[i] = array[j];
          array[j] = temp;
          i--;
        }
        return array;
      }
    };
  };

  PaperChase.service("Util", [f]);

}).call(this);
