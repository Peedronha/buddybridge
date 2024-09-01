import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {AnimalModel} from "../../../../restrict/base/animal/model/animal.model";
import {AnimalService} from "../../../../restrict/base/animal/service/animal.service";
import {NgClass, NgForOf} from "@angular/common";
import {AdoptionProfileModel} from "../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {AdoptionService} from "../../../../restrict/base/adoption-profile/shared/adoption.service";
import {AnimalCard} from "../../../../restrict/base/adoption-profile/model/AnimalCard";
import {AdoptionSubmissionFormComponent} from "../adoption-submission-form/adoption-submission-form.component";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
import id = _default.id;

@Component({
  selector: 'app-adoption-grid',
  standalone: true,
  imports: [
    TagModule,
    ButtonModule,
    DataViewModule,
    NgClass,
    NgForOf,
    AdoptionSubmissionFormComponent
  ],
  templateUrl: './adoption-grid.component.html',
  styleUrl: './adoption-grid.component.scss'
})
export class AdoptionGridComponent {
  @Input() profiles!: AdoptionProfileModel[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  layout: string = 'list';

  formVisible: boolean = false;

  animals!: AnimalCard[];

  genero = [
    { label: 'Fêmea', value: 'Female' },
    { label: 'Macho', value: 'Male' },
  ];


  constructor(private animalService: AnimalService, private adoptionService: AdoptionService) {}

  ngOnInit() {
    this.adoptionService.getAnimalsByProfileStatus().subscribe((data: AnimalCard[]) => {
      this.animals = data;
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

  onAdd(idAnimal: number | undefined) {
    this.add.emit(idAnimal);
  }
}