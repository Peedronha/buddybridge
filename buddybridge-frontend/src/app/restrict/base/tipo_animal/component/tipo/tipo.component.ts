import { Component } from '@angular/core';
import {Raca} from "../../../raca/model/raca.model";
import {RacaService} from "../../../raca/service/raca.service";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Tipo} from "../../model/tipo.model";
import {TipoService} from "../../service/tipo.service";

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.scss'
})
export class TipoComponent {
  tipos!: Tipo[]

  constructor(
    private tipoService: TipoService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.accountService.validarSessao();
  }

  refresh() {
    this.tipoService.getTipos().subscribe((data: Tipo[]) => {
      this.tipos = data; // Ensure data is of type Tipo[]
    });
  }

  onAdd() {
    this.router.navigate(['addtipo'], { relativeTo: this.route });
  }

  onEdit(idUser: any) {
    this.router.navigate(['edittipo', idUser], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.tipoService.deleteTipo(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
      window.location.reload();
      this.router.navigateByUrl('/tipos');
    });
  }
}
