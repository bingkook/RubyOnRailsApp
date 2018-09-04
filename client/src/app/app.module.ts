import { NgModule } from '@angular/core'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule  } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AngularTokenModule } from 'angular-token';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SignInComponent} from './login/sign-in.component';
import { RegisterComponent} from './register/register.component';
import { LayoutComponent} from  './layout/layout.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppComponent} from  './app.component';
import { ExampleModule} from  './example/example.module';
import { RestrictedModule} from  './restricted/restricted.module';
import { routes} from  './app.routes';
import { environment } from "../environments/environment";
import { SharedModule } from "./shared/shared.module";

@NgModule({
    imports: [
        routes,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CommonModule,
        ExampleModule,
        RestrictedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        SharedModule,
        LoadingBarModule.forRoot(),
        AngularTokenModule.forRoot({
            apiBase:environment.rootApiurl,
            signInRedirect: '/login',
        })
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US } 
    ],
    declarations: [
         AppComponent,
         SignInComponent,
         LayoutComponent,
         RegisterComponent,
         DashboardComponent],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
