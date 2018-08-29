import { Component, OnInit } from "@angular/core";
import { AngularTokenService, SignInData } from "angular-token";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { NzNotificationService } from "ng-zorro-antd";

@Component({
  selector: "sign-in",
  templateUrl: "sign-in.component.html",
  styleUrls: ["sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  ErrorMessage: string;
  IsloginLoading: boolean = false;
  LoginText: string = "Login";
  validateForm: FormGroup;
  signInData: SignInData = <SignInData>{};
  constructor(
    private _tokenService: AngularTokenService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private _router: Router,
  ) {}

  //创建表单
  createForm() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  //获取表单对象
  getUserModel(): any {
    let model = this.validateForm.value;
    this.signInData.login = model.userName;
    this.signInData.password = model.password;
  }
  //登录
  doLogin() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loginInt();
      this.getUserModel();
      console.log(this.signInData);
      this._tokenService.signIn(this.signInData).subscribe(
        (res:HttpResponse<boolean>) => {
          console.log(res);
          this.loginSuccess();
        },
        (error:HttpErrorResponse) => {
          this.ErrorMessage = error.error.errors[0];
         this.loginFailed();
        }
      );

      this.IsloginLoading = true;
    }
  }
  //初始化登录
  loginInt(): void {
    this.ErrorMessage = "";
    this.LoginText = "Loging...";
  }
  //登录成功
  loginSuccess(): void {
    this.IsloginLoading = false;
    this.LoginText = "Login";
    this._router.navigate(['/home']);
  }
  
  loginFailed(): void {
    this.IsloginLoading = false;
    this.notification.create('error', 'Login Faild', this.ErrorMessage);
    this.LoginText = "Login";
  }
  //登出
  public doLogout(): void {}

  public forgetPwd(): void {}

  ngOnInit(): void {
    this.createForm();
  }
}
