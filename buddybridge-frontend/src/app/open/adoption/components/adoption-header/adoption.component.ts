import { Component } from '@angular/core';
import {AdoptionGridComponent} from "../adoption-grid/adoption-grid.component";
import {
  AdoptionProfileListComponent
} from "../../../../restrict/base/adoption-profile/component/adoption-list/adoption-profile-list.component";
import {AdoptionProfileModel} from "../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {AdoptionService} from "../../../../restrict/base/adoption-profile/shared/adoption.service";
import {AccountService} from "../../../account/shared/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [
    AdoptionGridComponent,
    AdoptionProfileListComponent
  ],
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent {
  animals!: AdoptionProfileModel[]

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
      this.animals! = data;
    });
  }

  onAdd() {
    this.router.navigate(['addadocao'], { relativeTo: this.route });
  }

  // onRemove(idUser: any) {
  //   this.adoptionService.deleteAdoption(idUser).subscribe(() => {
  //     this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso'});
  //     window.location.reload();
  //     this.router.navigateByUrl('/adocao')
  //   })
  // }
}
