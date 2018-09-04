import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStorageService } from "./services/user-storage.service";
import { JWTInterceptor } from "./services/JWTInterceptor";
import { LocalStorageService} from './storages/local-storage.component';
import { SessionStorageService} from './storages/session-storage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        HttpClientModule,
       { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
        LocalStorageService,
        SessionStorageService,
        UserStorageService
    ]
})
export class SharedModule {}