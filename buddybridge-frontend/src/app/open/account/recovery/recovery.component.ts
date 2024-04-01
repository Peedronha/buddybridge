import { Component } from '@angular/core';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss'
})
export class RecoveryComponent {

    protected readonly alert = alert;
  email:string = "";
  otp: string = "";

  constructor() {
  }

  recuperar(){

  }
}
