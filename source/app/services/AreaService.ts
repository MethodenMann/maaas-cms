/// <reference path='../_all.ts' />

module maaas {
  export class AreaService {
    public static $inject = ['$resource'];

    store: any;

    constructor(private $resource) {
      this.store = $resource('areas.json')
    }

    public getAllAreas() {
      return this.store.query()
    }
  }

  maaas.app.service('AreaService', AreaService);
}
