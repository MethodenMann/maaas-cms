/// <reference path='../_all.ts' />

module maaas {
  export class DetailCtrl {

    private area: IArea;

    constructor(
      @Inject('$stateParams') private $stateParams,
      @Inject('Area') private Area
      ) {

      Area.find($stateParams.areaId).then((data) => {
        this.area = data;
      });
    }

    saveArea() {
      this.Area.update(this.area.id, this.area);
    }

  }
}
