import { Component, OnInit } from '@angular/core';

import { AngularTokenService } from 'angular-token';

@Component({
    selector: 'validate-token',
    templateUrl: 'validate-token.component.html'
})
export class ValidateTokenComponent {

    output: any;

    constructor(private _tokenService: AngularTokenService) { }

    // Submit Data to Backend
    onSubmit() {

        this.output = null;

        this._tokenService.validateToken().subscribe(
            res => this.output     = res,
            error => this.output   = error
        );
    }
}
