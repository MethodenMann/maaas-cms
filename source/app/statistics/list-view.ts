import {Inject} from '../utils/di';

export class ListView {
  private static selector = 'mas-statistics-list-view';
  private static templateUrl = './app/statistics/list-view.html';


  dlabels = ['Fertig gelöst', 'Unfertig'];
  ddata = [420, 280];

  blabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  bseries = ['Familien', 'Schulklassen'];

  bdata = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  //http://jtblin.github.io/angular-chart.js/


  slabels = ['Wolf', 'Bär', 'Frosch', 'Frisch', 'Bock', 'Dino', 'Ameise'];

  sdata = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
}
