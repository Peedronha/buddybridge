import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {AnimalModel} from "../../../../restrict/base/animal/model/animal.model";
import {AnimalService} from "../../../../restrict/base/animal/service/animal.service";
import {NgClass, NgForOf} from "@angular/common";
import {AdoptionProfileModel} from "../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {AdoptionService} from "../../../../restrict/base/adoption-profile/shared/adoption.service";

@Component({
  selector: 'app-adoption-grid',
  standalone: true,
  imports: [
    TagModule,
    ButtonModule,
    DataViewModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './adoption-grid.component.html',
  styleUrl: './adoption-grid.component.scss'
})
export class AdoptionGridComponent {
  @Input() profiles!: AdoptionProfileModel[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  layout: string = 'list';

   animals!: AnimalModel[];

  constructor(private animalService: AnimalService, private adoptionService: AdoptionService) {}

  ngOnInit() {
    this.adoptionService.getAnimalsByProfileStatus().subscribe((data: AnimalModel[]) => {
      this.animals = data;
    });
  }

  getStatusSeverity(animal:any) {
    // Adjust this method to reflect relevant information for the animal,
    // such as health status, urgency, or availability for adoption
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

}
