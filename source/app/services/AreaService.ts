/// <reference path='../_all.ts' />

module maaas {
  export class AreaService {
    public static $inject = ['$resource'];

    private store: any;

    constructor(
      @Inject('$resource') private $resource
      ) {
      this.store = $resource('https://maaas-backend.herokuapp.com/areas')
    }

    public getAllAreas() {
      return this.store.query().$promise;
    }
  }

  maaas.app.service('AreaService', AreaService);
}
