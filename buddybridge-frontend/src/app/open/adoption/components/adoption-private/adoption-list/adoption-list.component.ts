import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {AdoptionProfileModel} from "../../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {FormBuilder, Validators} from "@angular/forms";
import {AdoptionService} from "../../../../../restrict/base/adoption-profile/shared/adoption.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalCard} from "../../../../../restrict/base/adoption-profile/model/AnimalCard";
import {AnimalService} from "../../../../../restrict/base/animal/service/animal.service";
import {AdoptionFormModel} from "../../../models/AdoptionFormModel";
import {AdoptionSubmissionFormComponent} from "../../adoption-submission-form/adoption-submission-form.component";

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
  @Input() adoptions!: AdoptionFormModel[];

  _specificEntity: any = {};

  @Output() add = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  layout: string = 'list';

  formVisible: boolean = false;

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
      this.adoptions = data;
    });
  }


  onEdit(idAdocao: number) {
    this.edit.emit(idAdocao);
  }
}
