import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {MessagesModule} from "primeng/messages";
import {NgForOf, NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-form-historico-medico',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    MessagesModule,
    NgForOf,
    NgIf,
    RippleModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './form-historico-medico.component.html',
  styleUrl: './form-historico-medico.component.scss'
})
export class FormHistoricoMedicoComponent {

}
