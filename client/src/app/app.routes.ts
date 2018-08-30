import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./login/sign-in.component";
import { ExampleComponent } from "./example/example.component";
import { RestrictedComponent } from "./restricted/restricted.component";
import { AngularTokenService } from "angular-token";
import { LayoutComponent } from "./layout/layout.component";
import { RegisterComponent} from './register/register.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

const routerConfig: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent ,
        canActivate: [AngularTokenService] 
      },
      {
        path: "home",
        component: DashboardComponent, 
        canActivate: [AngularTokenService]   
      },
      {
        path: "project",
        loadChildren: "./project/project.module#ProjectModule", 
        canActivate: [AngularTokenService]   
      }
    ]
  },

  { path: "login", component: SignInComponent },
  { path: "register", component: RegisterComponent }
];

export const routes = RouterModule.forRoot(routerConfig, { useHash: true });
