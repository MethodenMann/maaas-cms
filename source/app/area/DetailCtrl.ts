/// <reference path='../_all.ts' />

module maaas {
  export class DetailCtrl {

    private area: IArea;

    constructor(
      @Inject('$stateParams') private $stateParams,
      @Inject('Area') private Area
      ) {

      Area.findAll().then((data) => {
        this.area = data[$stateParams.areaId];
        this.area.id = $stateParams.areaId;
      });
    }
  }
}
