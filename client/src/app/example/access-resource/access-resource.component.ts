import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';

@Component({
    selector: 'access-resource',
    templateUrl: 'access-resource.component.html'
})
export class AccessResourceComponent {

    output: any;

    constructor(private http: HttpClient) { }

    // Submit Data to Backend
    onSubmit() {

        this.output = null;

        this.http.get('private_resource').subscribe(
            res => this.output      = res,
            error => this.output    = error
        );
    }
}
