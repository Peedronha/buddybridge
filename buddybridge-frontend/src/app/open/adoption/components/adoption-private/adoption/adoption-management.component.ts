import { Component } from '@angular/core';
import {AdoptionProfileModel} from "../../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {AdoptionService} from "../../../../../restrict/base/adoption-profile/shared/adoption.service";
import {AccountService} from "../../../../account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdoptionRequest} from "../../../../../restrict/base/adoption-profile/model/AdoptionRequest";
import {AdoptionFormModel} from "../../../models/AdoptionFormModel";
import {
  AdoptionProfileListComponent
} from "../../../../../restrict/base/adoption-profile/component/adoption-list/adoption-profile-list.component";
import {AdoptionListComponent} from "../adoption-list/adoption-list.component";

@Component({
  selector: 'app-adoption-management',
  standalone: true,
  imports: [
    AdoptionProfileListComponent,
    AdoptionListComponent
  ],
  templateUrl: './adoption-management.component.html',
  styleUrl: './adoption-management.component.scss'
})
export class AdoptionManagementComponent {
  adoptions!: AdoptionFormModel[]

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
    this.adoptionService.getAdoptions().subscribe((data: AdoptionFormModel[]) => {
      this.adoptions! = data;
    });
  }


  onEdit(idAdocao: any) {
    this.router.navigate(['editsubmission', idAdocao], { relativeTo: this.route });
  }

  onRemove(idUser: any) {
    this.adoptionService.deleteAdoptionProfile(idUser).subscribe(() =>{
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso' });
      window.location.reload();
      this.router.navigateByUrl('/perfil-adocao')
    })
  }
}
