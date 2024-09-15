import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {AdoptionProfileModel} from "../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {FormBuilder, Validators} from "@angular/forms";
import {AdoptionService} from "../../../../restrict/base/adoption-profile/shared/adoption.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalCard} from "../../../../restrict/base/adoption-profile/model/AnimalCard";
import {AnimalService} from "../../../../restrict/base/animal/service/animal.service";
import {AdoptionFormModel} from "../../models/AdoptionFormModel";
import {AdoptionSubmissionFormComponent} from "../adoption-submission-form/adoption-submission-form.component";

@Component({
  selector: 'app-adoption-list',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        InputTextModule,
        RippleModule,
        SharedModule,
        TableModule
    ],
  templateUrl: './adoption-list.component.html',
  styleUrl: './adoption-list.component.scss'
})
export class AdoptionListComponent {
  @Input() profiles!: AdoptionFormModel[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  layout: string = 'list';

  formVisible: boolean = false;

  adoptions!: AdoptionFormModel[];

  genero = [
    { label: 'Fêmea', value: 'Female' },
    { label: 'Macho', value: 'Male' },
  ];


  constructor(private animalService: AnimalService,
              private adoptionService: AdoptionService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.adoptionService.getAdoptions().subscribe((data: AdoptionFormModel[]) => {
      alert(JSON.stringify(data))

      this.adoptions = data;
    });
  }

  getStatusSeverity(animal:any) {
    switch (animal.status) {
      case 'AVAILABLE':
        return 'success';
      case 'URGENT':
        return 'warning';
      case 'NOT_AVAILABLE':
        return 'danger';
      default:
        return null;
    }
  }

  onEdit(idAdocao: number | undefined) {
    this.router.navigate(['editsubmission', idAdocao], { relativeTo: this.route });
  }
}
