  export function GetMasterRoute(name) {
    return {
      url: '/' + name,
      templateUrl: './app/master/view/content.html',
      ncyBreadcrumb: {
        label: 'Bereiche'
      },
      data: {
        requireLogin: true
      }
    };
  }
