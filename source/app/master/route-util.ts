export class RouteUtil {
  public static GetMasterRoute(name, displayName) {
    return {
      url: '/' + name,
      abstract: true,
      template: '<div ui-view=""></div>',
      ncyBreadcrumb: {
        label: displayName
      },
      data: {
        requireLogin: true
      }
    };
  }


  public static GetRoute(component, displayName, parent = '', url = '') {
    return {
      url: url,
      controller: component,
      controllerAs: 'ctrl',
      templateUrl: component.templateUrl,
      ncyBreadcrumb: {
        label: displayName,
        parent: parent
      }
    };
  }

}