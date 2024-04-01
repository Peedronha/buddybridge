import { Component } from '@angular/core';
import _default from "chart.js/dist/plugins/plugin.tooltip";
import bodyFont = _default.defaults.bodyFont;

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss',
  styles: [
    `
        .custom-otp-input {
            width: 48px;
            height: 48px;
            font-size: 24px;
            appearance: none;
            text-align: center;
            transition: all 0.2s;
            border-radius: 0;
            border: 1px solid var(--surface-400);
            background: transparent;
            outline-offset: -2px;
            outline-color: transparent;
            border-right: 0 none;
            transition: outline-color 0.3s;
            color: var(--text-color);
        }

        .custom-otp-input:focus {
            outline: 2px solid var(--primary-color);
        }

        .custom-otp-input:first-child,
        .custom-otp-input:nth-child(5) {
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
        }

        .custom-otp-input:nth-child(3),
        .custom-otp-input:last-child {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
            border-right-width: 1px;
            border-right-style: solid;
            border-color: var(--surface-400);
        }`
  ],
})
export class RecoveryComponent {

    protected readonly alert = alert;
    email: string = "";
    value: string = "";

    show: boolean = false;

  constructor() {
  }

  recuperar(){
  this.toggle()
  }

  toggle(){
    this.show = !this.show;
  }
}
