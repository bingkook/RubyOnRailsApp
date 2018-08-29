import { Component, OnInit } from '@angular/core';

import { AngularTokenService, UpdatePasswordData } from 'angular-token';

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html'
})
export class ChangePasswordComponent {

    updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
    output:             any;

    constructor(private _tokenService: AngularTokenService) { }

    // Submit Data to Backend
    onSubmit() {

        this.output = null;

        this._tokenService.updatePassword(this.updatePasswordData).subscribe(
            res => {
                this.updatePasswordData    = <UpdatePasswordData>{};
                this.output                = res;
            }, error => {
                this.updatePasswordData    = <UpdatePasswordData>{};
                this.output                = error;
            }
        );
    }
}
