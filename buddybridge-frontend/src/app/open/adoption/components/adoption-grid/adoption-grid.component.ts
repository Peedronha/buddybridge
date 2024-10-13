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
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";

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
    DataViewModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    RippleModule,
    TableModule
  ],
  templateUrl: './adoption-grid.component.html',
  styleUrls: ['./adoption-grid.component.scss']
})
export class AdoptionGridComponent {
  @Input() profiles!: AdoptionProfileModel[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  animals: any[] = [];
  filteredAnimals: any[] = [];
  filterName: string = '';
  filterGender: string = '';
  filterBreed: string = '';
  filterLocation: string = '';
  filterMinAge: number | null = null;
  filterMaxAge: number | null = null;

  genders: any[] = [
    { label: 'Todos', value: '' },
    { label: 'Macho', value: 'Macho' },
    { label: 'Fêmea', value: 'Fêmea' }
  ];


  applyFilters(): void {
    this.filteredAnimals = this.animals.filter(animal => {
      const matchesName = this.filterName ? animal.nome_animal.toLowerCase().includes(this.filterName.toLowerCase()) : true;
      const matchesBreed = this.filterBreed ? animal.raca_animal.toLowerCase().includes(this.filterBreed.toLowerCase()) : true;
      const matchesGender = this.filterGender ? animal.genero_animal === this.filterGender : true;
      const matchesLocation = this.filterLocation ? animal.localizacao_animal.toLowerCase().includes(this.filterLocation.toLowerCase()) : true;
      const matchesMinAge = this.filterMinAge !== null ? animal.idade >= this.filterMinAge : true;
      const matchesMaxAge = this.filterMaxAge !== null ? animal.idade <= this.filterMaxAge : true;

      return matchesName && matchesBreed && matchesGender && matchesLocation && matchesMinAge && matchesMaxAge ;
    });
  }

  layout: 'list' | 'grid' = 'grid'; // Default layout

  genero = [
    { label: 'Fêmea', value: 'Female' },
    { label: 'Macho', value: 'Male' },
  ];

  constructor(private animalService: AnimalService, private adoptionService: AdoptionService) {}

  ngOnInit() {
    this.adoptionService.getAnimalsByProfileStatus().subscribe((data: AnimalCard[]) => {
      console.log('Received data:', data);
      this.filteredAnimals = data;
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
