/// <reference path='../_all.ts' />

module maaas {
	export interface ITestService {
		get (): number;
		put(i : number): void;
	}
}
