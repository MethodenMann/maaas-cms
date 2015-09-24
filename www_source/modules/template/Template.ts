import {App} from "../../App";
import {TemplateCtrl} from "./TemplateCtrl";
import {TemplateService} from "./TemplateService";


const module:ng.IModule = App.module("app.template", []);

module.controller("Template", TemplateCtrl);
module.service("templateService", TemplateService);


// @ngInject
module.config(($stateProvider:ng.ui.IStateProvider) => {
  $stateProvider.state("login", {
    url: "/template",
    views: {
      application: {
        templateUrl: "src/module/teamplate/view/login.html",
        controller: TemplateCtrl,
        controllerAs: "controller"
      }
    }
  })
});
