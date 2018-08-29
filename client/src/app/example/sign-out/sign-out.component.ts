import { Component, OnInit } from '@angular/core';

import { AngularTokenService } from 'angular-token';

@Component({
    selector: 'sign-out',
    templateUrl: 'sign-out.component.html'
})
export class SignOutComponent {

    output: any;

    constructor(private _tokenService: AngularTokenService) { }

    // Submit Data to Backend
    onSubmit() {

        this.output = null;

        this._tokenService.signOut().subscribe(
            res => this.output      = res,
            error => this.output    = error
        );
    }
}
