import { NgModule } from '@angular/core'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule  } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { routes} from  './project.routes';
import { environment } from "../../environments/environment";
import { ProjectListComponent } from "./project.component";
import { ProjectAddComponent } from "./add/project.add.component";

@NgModule({
    imports: [
        routes,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US } 
    ],
    declarations: [
        ProjectListComponent,ProjectAddComponent
],entryComponents:[
    ProjectAddComponent
]
})
export class ProjectModule { }
