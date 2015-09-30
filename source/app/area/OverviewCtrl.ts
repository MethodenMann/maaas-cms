/// <reference path='../_all.ts' />

module maaas {
  export class OverviewCtrl {
    private areas: IArea[] = [];

    constructor(
      @Inject('$location') private $location,
      @Inject('AreaService') private AreaService
      ) {

      AreaService.getAllAreas().then((data) => {
        this.areas = data;
      });
    }
  }
}
