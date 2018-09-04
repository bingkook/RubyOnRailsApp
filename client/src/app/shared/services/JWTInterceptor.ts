
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import { LoadingBarService } from "@ngx-loading-bar/core";
import { Injectable } from "@angular/core";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { NzNotificationService } from "ng-zorro-antd";
import { UserStorageService } from "./user-storage.service";
import { AngularTokenService } from "angular-token";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private _loaderService: LoadingBarService,
    private notification: NzNotificationService,
    private _router: Router,
    private _userStorageService: UserStorageService,
    private tokenService: AngularTokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    this._loaderService.start();
    const JWT = `Bearer ${this._userStorageService.getToken()}`;
    const oldUrl = req.url;
    this.tokenService.getAuthDataFromStorage();
    const headers = {
      'access-token': this.tokenService.currentAuthData.accessToken,
      'client':       this.tokenService.currentAuthData.client,
      'expiry':       this.tokenService.currentAuthData.expiry,
      'token-type':   this.tokenService.currentAuthData.tokenType,
      'uid':          this.tokenService.currentAuthData.uid
    };
    req = req.clone({
      setHeaders: headers,
      url: environment.rootApiurl + oldUrl
    });
    console.log(JWT);
    return next
      .handle(req)
      .mergeMap((event: any) => {
        if (event.status == 200) {
          this._loaderService.complete();
          console.log("request success.");
        } else if (event instanceof HttpResponse) {
          return Observable.create(observer => observer.error(event));
        }
        return Observable.create(observer => observer.next(event));
      })
      .catch((res: HttpResponse<any>) => {
        this._loaderService.complete();
        switch (res.status) {
          case 401:
            this.notification.create(
              "error",
              "Time out",
              "You should relogin."
            );
            this._router.navigate(["passport/login"]);
            break;
          case 0:
            swal({
              position: "top-end",
              type: "error",
              title: "The network is not avaliable.",
              showConfirmButton: false,
              showCloseButton: true,
              toast: true,
              timer: 3500
            });
            break;
          case 404:
            swal({
              position: "top-end",
              type: "error",
              title: "(Error:404)Not found",
              showConfirmButton: false,
              showCloseButton: true,
              toast: true,
              timer: 3500
            });
            break;
          case 400:
          case 405:
            swal({
              position: "top-end",
              type: "error",
              title: "(Error:405)There is an error in the remote server.",
              showConfirmButton: false,
              showCloseButton: true,
              toast: true,
              timer: 3500
            });
            break;
          case 501:
          case 500:
            swal({
              position: "top-end",
              type: "error",
              title: "(Error:" + res.status + ")Error occured, please contact with the administrator.",
              showConfirmButton: false,
              showCloseButton: true,
              toast: true,
              timer: 3500
            });
            break;
        }
        return Observable.throw(res);
      });
  }
}
