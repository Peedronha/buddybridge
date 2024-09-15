import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { DataViewModule } from "primeng/dataview";
import { AnimalModel } from "../../../../restrict/base/animal/model/animal.model";
import { AnimalService } from "../../../../restrict/base/animal/service/animal.service";
import { NgClass, NgForOf } from "@angular/common";
import { AdoptionProfileModel } from "../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import { AdoptionService } from "../../../../restrict/base/adoption-profile/shared/adoption.service";
import { AnimalCard } from "../../../../restrict/base/adoption-profile/model/AnimalCard";
import { AdoptionSubmissionFormComponent } from "../adoption-submission-form/adoption-submission-form.component";
import { CardModule } from "primeng/card";

@Component({
  selector: 'app-adoption-grid',
  standalone: true,
  imports: [
    TagModule,
    ButtonModule,
    NgClass,
    NgForOf,
    AdoptionSubmissionFormComponent,
    CardModule,
    DataViewModule
  ],
  templateUrl: './adoption-grid.component.html',
  styleUrls: ['./adoption-grid.component.scss'] // fixed typo (styleUrls instead of styleUrl)
})
export class AdoptionGridComponent {
  @Input() profiles!: AdoptionProfileModel[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  layout: 'list' | 'grid' = 'grid'; // Default layout

  animals!: AnimalCard[];

  genero = [
    { label: 'Fêmea', value: 'Female' },
    { label: 'Macho', value: 'Male' },
  ];

  constructor(private animalService: AnimalService, private adoptionService: AdoptionService) {}

  ngOnInit() {
    this.adoptionService.getAnimalsByProfileStatus().subscribe((data: AnimalCard[]) => {
      console.log('Received data:', data);
      this.animals = data;
    });
  }


  onAdd(idAnimal: number | undefined) {
    this.add.emit(idAnimal);
  }

  getGenderLabel(genderValue: string | undefined): string {
    const gender = this.genero.find(g => g.value === genderValue);
    return gender ? gender.label : 'Unknown';
  }
}
