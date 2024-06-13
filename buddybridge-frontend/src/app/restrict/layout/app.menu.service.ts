import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEvent } from './api/menuchangeevent';
import { AccountService } from '../../open/account/shared/account.service';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();

    constructor(
      private accountService: AccountService,
    ) { }

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(event: MenuChangeEvent) {
      this.accountService.validarSessao();
      this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }
}
