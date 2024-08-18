import { Component } from '@angular/core';
import {AdoptionProfileListComponent} from "../adoption-list/adoption-profile-list.component";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdoptionModel} from "../../model/AdoptionProfileModel";
import {AdoptionService} from "../../shared/adoption.service";

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [
    AdoptionProfileListComponent
  ],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent {
  adoptions!: AdoptionModel[]

  constructor(
    private adoptionService: AdoptionService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  ngOnInit(): void { this.accountService.validarSessao(); }

  refresh() {
    this.adoptionService.getAdoptions().subscribe((data: AdoptionModel[]) => {
      this.adoptions! = data;
    });
  }

  onAdd(idAnimal: number) {
    this.router.navigate(['addadoption', idAnimal], { relativeTo: this.route });
  }

  onEdit(idUser: any) {
    this.router.navigate(['editadoption', idUser], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.adoptionService.deleteAdoption(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
      window.location.reload();
      this.router.navigateByUrl('/adocao')
    })
  }
}
