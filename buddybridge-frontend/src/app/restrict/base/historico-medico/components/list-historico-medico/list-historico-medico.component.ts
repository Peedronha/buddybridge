import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-list-historico-medico',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    SharedModule,
    TableModule
  ],
  templateUrl: './list-historico-medico.component.html',
  styleUrl: './list-historico-medico.component.scss'
})
export class ListHistoricoMedicoComponent {

}
