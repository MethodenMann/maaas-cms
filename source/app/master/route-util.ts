export class RouteUtil {
  public static getAbstractRoute(url, displayName = '', parent = 'cms.welcome') {
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

  public static getRoute(component, displayName, parent = 'cms.welcome', url = '') {
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
