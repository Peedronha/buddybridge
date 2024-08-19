import { Component } from '@angular/core';
import {AdoptionProfileListComponent} from "../adoption-list/adoption-profile-list.component";
import {AccountService} from "../../../../../open/account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdoptionService} from "../../shared/adoption.service";
import {AdoptionProfileModel} from "../../model/AdoptionProfileModel";

@Component({
  selector: 'app-adoption-profile',
  standalone: true,
  imports: [
    AdoptionProfileListComponent
  ],
  templateUrl: './adoption-profile.component.html',
  styleUrl: './adoption-profile.component.scss'
})
export class AdoptionProfileComponent {
  profiles!: AdoptionProfileModel[]

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
    this.adoptionService.getAdoptionsProfiles().subscribe((data: AdoptionProfileModel[]) => {
      this.profiles! = data;
    });
  }

  onAdd() {
    this.router.navigate(['addperfil'], { relativeTo: this.route });
  }

  onEdit(idUser: any) {
    this.router.navigate(['editperfil', idUser], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.adoptionService.deleteAdoption(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
      window.location.reload();
      this.router.navigateByUrl('/perfil-adocao')
    })
  }
}
