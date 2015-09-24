export class TemplateService {


  private test:SomeClass;

  // @ngInject
  constructor(private $http:ng.IHttpService) {
  }

  public set(i:number) {
    this.test = null;
  };
}

export interface SomeClass {
  id:number;
  title:string;
}
