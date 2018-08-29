import { NgModule } from '@angular/core'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule  } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AngularTokenModule } from 'angular-token';
import { SignInComponent} from './login/sign-in.component';
import { RegisterComponent} from './register/register.component';
import { LayoutComponent} from  './layout/layout.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppComponent} from  './app.component';
import { ExampleModule} from  './example/example.module';
import { RestrictedModule} from  './restricted/restricted.module';
import { routes} from  './app.routes';
import { environment } from "../environments/environment";


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
        AngularTokenModule.forRoot({
            apiBase:environment.rootApiurl,
            signInRedirect: '/login',
        })
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN } 
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
