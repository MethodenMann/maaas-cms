/// <reference path='../_all.ts' />

module maaas {
  export class CreateCtrl {

    private area: IArea;

    constructor(
      @Inject('$stateParams') private $stateParams,
      @Inject('Area') private Area
      ) {
        console.log("CREATE");
    }

    saveArea() {
      console.log("create",this.area);
      this.Area.create(this.area);
    }

  }
}
