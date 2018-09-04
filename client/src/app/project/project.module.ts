import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { routes } from "./project.routes";
import { ProjectListComponent } from "./project.component";
import { ProjectAddComponent } from "./add/project.add.component";
import { SharedModule } from "../shared/shared.module";
import { ProjectService } from "../services/project.service";

@NgModule({
  imports: [
    routes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SharedModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ProjectService],
  declarations: [ProjectListComponent, ProjectAddComponent],
  entryComponents: [ProjectAddComponent]
})
export class ProjectModule {}
