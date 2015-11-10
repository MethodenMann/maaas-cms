import {Inject} from '../utils/di';
import {IBeacon} from './IBeacon';

export class ListView {
  private static selector = 'mas-beacon-list-view';
  private static templateUrl = './app/beacons/list-view.html';



  private beacons: IBeacon[] = [];
  private gridOptions: any;
  private gridApi: any;

  constructor(
    @Inject('$scope') private $scope,
    @Inject('Beacon') private Beacon,
    @Inject('KontaktIoService') private KontaktIoService,
    @Inject('$filter') private $filter

    ) {

    this.loadData();
  }

  private loadData() {
    this.Beacon.findAll().then((beacons) => {
      this.beacons = beacons;
    });
  }

  private removeBeacon(idx) {
    this.beacons.splice(idx, 1);
  }


  //private deleteSelected() {
  //  var conf = confirm('really?'); //Todo: Make more sexy
  //  if (conf) {
  //    this.gridApi.selection.getSelectedRows().forEach((b) => {
  //      this.Beacon.destroy(b.id);
  //    });
  //  }
  //}

  private syncWithKontaktIO() {
    this.KontaktIoService.GetNewBeacons(this.beacons).then(beacons => {
      var conf = confirm(beacons.length + ' Beacon(s) werden hinzugefügt'); //Todo: Make more sexy
      if (conf) {
        beacons.forEach((b) => {
          this.Beacon.create({ beacon: b });
        });
      }
    });
  }

  //private onCellEdit(Beacon, rowEntity) {
  //  Beacon.update(rowEntity.id, { beacon: rowEntity });
  //}
  //
  //private initializeGrid() {
  //  this.gridOptions = {
  //    enableSorting: true,
  //    enableHorizontalScrollbar: 0,
  //    enableRowSelection: true,
  //    onRegisterApi: (gridApi) => {
  //      this.gridApi = gridApi;
  //      this.gridApi.edit.on.afterCellEdit(this.$scope, (rowEntity, colDef, newValue, oldValue) => {
  //        this.onCellEdit(this.Beacon, rowEntity);
  //      });
  //    },
  //    columnDefs: [
  //      { name: this.$filter('translate')('beacons_list_columnheader_name'), field: 'uniqueId', enableCellEdit: false },
  //      { name: this.$filter('translate')('beacons_list_columnheader_alias'), field: 'description' },
  //      { name: 'Major', field: 'major', enableCellEdit: false },
  //      { name: 'Minor', field: 'minor', enableCellEdit: false },
  //      { name: 'uuid', field: 'uuid' }
  //    ]
  //  };
  //}

}
