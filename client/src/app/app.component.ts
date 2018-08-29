import { Component, ViewEncapsulation, TemplateRef,ViewChild } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    isCollapsed = false;
    triggerTemplate = null;
    constructor(private _tokenService: AngularTokenService) {
    }
    @ViewChild('trigger') customTrigger: TemplateRef<void>;

    changeTrigger(): void {
        this.triggerTemplate = this.customTrigger;
      }
}
