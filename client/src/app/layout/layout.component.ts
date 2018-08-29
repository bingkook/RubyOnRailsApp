import { Component, OnInit } from "@angular/core";
import { AngularTokenService, SignInData } from "angular-token";
import { Router } from "@angular/router";

@Component({
  selector: "layout",
  templateUrl: "layout.component.html"
})
export class LayoutComponent {
  constructor(private tokenService: AngularTokenService,
    private _router: Router) {}

  loginOut(){
    localStorage.clear();
    this._router.navigate(["/login"]);
  }
}
