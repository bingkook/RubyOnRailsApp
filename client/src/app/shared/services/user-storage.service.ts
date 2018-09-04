import { Injectable } from '@angular/core';
import { SessionStorageService } from '../storages/session-storage.component';
import { LocalStorageService } from '../storages/local-storage.component';
import { StorageKey } from '../../shared/config/config.metadata';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class UserStorageService {
  constructor(
    private _SessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {}

  public getStorageByKey(key: StorageKey): string {
    let value = '';
    if (environment.currentStorageType == 'local') {
      const local = this._localStorageService.get(StorageKey[key]);
      if (local != null && local !== undefined) {
        value = local;
      }
    } else {
      const session = this._SessionStorageService.get(StorageKey[key]);
      if (session != null && session !== undefined) {
        value = session;
      }
    }
    return value;
  }

  public setStorageByKey(key: StorageKey, value: any): void {
    if (environment.currentStorageType == 'local') {
      this._localStorageService.set(StorageKey[key], value);
    } else {
      this._SessionStorageService.set(StorageKey[key], value);
    }
  }

  public getAccessToken(): string {
    return this.getTokenType() + ' ' + this.getToken();
  }

  public getToken(): string {
    return this.getStorageByKey(StorageKey.accessToken);
  }

  public getTokenType(): string {
    return this.getStorageByKey(StorageKey.tokenType);
  }
}
