import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularTokenService } from 'angular-token';

import {
    OutputComponent,
    ExampleComponent,
    SignInOAuthComponent,
    SignOutComponent,
    ChangePasswordComponent,
    AccessResourceComponent,
    ValidateTokenComponent
} from './';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        ExampleComponent,
        OutputComponent,
        SignInOAuthComponent,
        ChangePasswordComponent,
        SignOutComponent,
        AccessResourceComponent,
        ValidateTokenComponent
    ],
    exports: [
        ExampleComponent
    ]
})
export class ExampleModule { }
