/// <reference path='../_all.ts' />

module maaas {
  export class AreaService {
    public static $inject = ['$resource'];

    store: any;

    constructor(private $resource) {
      this.store = $resource('http://localhost:3000/areas')
    }

    public getAllAreas() {
      return this.store.query()
    }
  }

  maaas.app.service('AreaService', AreaService);
}
