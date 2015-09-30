/// <reference path='../_all.ts' />

module maaas {
  export class DetailCtrl {

    private area: IArea;

    constructor(
      @Inject('$stateParams') private $stateParams,
      @Inject('AreaService') private AreaService
      ) {

      AreaService.getAllAreas().then((data) => {
        this.area = data[$stateParams.areaId];
        this.area.id = $stateParams.areaId;
      });
    }
  }
}
