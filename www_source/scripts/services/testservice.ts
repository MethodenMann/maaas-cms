/// <reference path='../_all.ts' />

module maaas {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    export class TestService implements ITestService {
        private numb: number = 33;

        get (): number {
            return this.numb;
        }

        put(i : number) {
           this.numb = i;
        }
    }
}
