import { Component } from '@angular/core';
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Raca} from "../../model/raca.model";
import {RacaService} from "../../service/raca.service";

@Component({
  selector: 'app-raca',
  templateUrl: './raca.component.html',
  styleUrl: './raca.component.scss'
})
export class RacaComponent {
  racas!: Raca[]

  constructor(
    private racaService: RacaService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void { this.accountService.validarSessao(); }

  refresh() {
    this.racaService.getRacas().subscribe((data: Raca[]) => {
      this.racas! = data;
    });
  }

  onAdd() {
    this.router.navigate(['addraca'], { relativeTo: this.route });
  }

  onEdit(idUser: any) {
    this.router.navigate(['editraca', idUser], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.racaService.deleteRaca(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
      window.location.reload();
      this.router.navigateByUrl('/animal')
    })
  }
}
