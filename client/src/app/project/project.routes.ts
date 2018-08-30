import { RouterModule, Routes } from "@angular/router";
import { AngularTokenService } from "angular-token";
import { ProjectListComponent } from "./project.component";

const routerConfig: Routes = [
  {
    path: "",
    component: ProjectListComponent,
    canActivate: [AngularTokenService] 
  }
];

export const routes = RouterModule.forChild(routerConfig);
