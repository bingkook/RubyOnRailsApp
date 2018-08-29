import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularTokenService } from 'angular-token';

import {
    RestrictedComponent
} from './';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        RestrictedComponent
    ],
    exports: [
        RestrictedComponent
    ]
})
export class RestrictedModule { }