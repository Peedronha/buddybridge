import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

    sair(){
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('idUser');
      window.localStorage.removeItem('login');
      window.localStorage.removeItem('valid');
      window.localStorage.removeItem('validarEmail');
      window.location.href = '/login';
    }


}
