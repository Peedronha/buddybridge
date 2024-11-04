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
import {AdoptionListComponent} from "../adoption-private/adoption-list/adoption-list.component";
import {AdoptionFormModel} from "../../models/AdoptionFormModel";

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.scss'
})
export class AdoptionComponent {
  profiles!: AdoptionProfileModel[]
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
    this.adoptionService.getAdoptionsProfiles().subscribe((data: AdoptionProfileModel[]) => {
      this.profiles! = data;
    });
    this.adoptionService.getAdoptions().subscribe((data: AdoptionFormModel[]) => {
      this.adoptions = data;
    });
  }

  onAdd(idUser: any) {
    this.router.navigate(['addadocao', idUser], { relativeTo: this.route });
  }

  onEdit(idUser: number) {
    this.router.navigate(['editadocao', idUser], { relativeTo: this.route });
  }
}
