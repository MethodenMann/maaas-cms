export class RouteUtil {
  public static getAbstractRoute(url, displayName="", parent="cms") {
    return {
      url: url,
      abstract: true,
      template: '<div ui-view=""></div>',
      ncyBreadcrumb: {
        label: displayName,
        parent: parent
      },
      data: {
        requireLogin: true
      }
    };
  }

  public static getDetailRoute(url, parent) {
    return {
      url: url,
      abstract: true,
      template: '<div ui-view=""></div>',
      ncyBreadcrumb: {
        parent: parent
      }
    };
  }

  public static getRoute(component, displayName, parent = '', url = '') {
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
