import { Component, OnInit } from "@angular/core";
import { AngularTokenService, SignInData } from "angular-token";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd";
import { Router } from '@angular/router';

@Component({
  selector: "register",
  templateUrl: "register.component.html",
  styleUrls: ["register.component.css"]
})
export class RegisterComponent implements OnInit {
  ErrorMessage: string;
  IsloginLoading: boolean = false;
  LoginText: string = "Register";
  validateForm: FormGroup;
  signInData: SignInData = <SignInData>{};
  constructor(
    private _tokenService: AngularTokenService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private _router: Router,
  ) {}

  createForm() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]]
    });
  }

  register() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.registerInit();
      let model = this.validateForm.value;

      var registermodel={
        login:                model.userName,
        password:             model.password,
        passwordConfirmation: model.passwordConfirm
      };
      console.log(registermodel);
      this._tokenService.registerAccount(registermodel).subscribe(
        (res:HttpResponse<boolean>) => {
          this.registerSuccess();
        },
        (error:HttpErrorResponse) => {
          this.ErrorMessage = error.error.errors[0];
         this.registerFailed();
        }
      );

      this.IsloginLoading = true;
    }
  }

  registerInit(): void {
    this.ErrorMessage = "";
    this.LoginText = "Submitting...";
  }

  registerSuccess(): void {
    this.IsloginLoading = false;
    this.LoginText = "Register";
    this.notification.create('success', 'Register Success', "Please login now.");
    this._router.navigate(['/login']);
  }
  
  registerFailed(): void {
    this.IsloginLoading = false;
    this.notification.create('error', 'Register Faild', this.ErrorMessage);
    this.LoginText = "Register";
  }
  //登出
  public doLogout(): void {}

  public forgetPwd(): void {}

  ngOnInit(): void {
    this.createForm();
  }
}
