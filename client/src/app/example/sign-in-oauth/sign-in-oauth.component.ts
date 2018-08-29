import { Component, OnInit } from '@angular/core';

import { AngularTokenService } from 'angular-token';

@Component({
    selector: 'sign-in-oauth',
    templateUrl: 'sign-in-oauth.component.html'
})
export class SignInOAuthComponent {

    output: any;

    constructor(private _tokenService: AngularTokenService) { }

    // Submit Data to Backend
    onSubmit() {

        this.output = null;

        this._tokenService.signInOAuth('github');
    }
}
