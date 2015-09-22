/// <reference path='../_all.ts' />

module maaas {
	export interface IAreaScope extends ng.IScope {
		areas: Area[];
		somestring: string;
		vm: AreaCtrl;
	}
}
