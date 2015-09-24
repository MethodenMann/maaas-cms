import {App} from "./App";


import "./module/template/Template";


App.element(document).ready(() => {
  App.bootstrap(document, [
    "app",
    "app.template"
  ]);
});
