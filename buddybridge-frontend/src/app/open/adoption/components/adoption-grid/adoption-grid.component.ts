import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {AnimalModel} from "../../../../restrict/base/animal/model/animal.model";
import {AnimalService} from "../../../../restrict/base/animal/service/animal.service";
import {NgClass, NgForOf} from "@angular/common";
import {AdoptionProfileModel} from "../../../../restrict/base/adoption-profile/model/AdoptionProfileModel";

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
  @Input() animals!: AdoptionProfileModel[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  layout: string = 'list';
   // animals!: AnimalModel[];

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    // this.animalService.getAnimals().((data) => (this.animals = data.slice(0, 12)));
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
  // animals = [
  //   {
  //     name: 'Nairobi',
  //     imageUrl: 'https://via.placeholder.com/300x200.png',
  //     gender: 'Female',
  //     size: 'Médio',
  //     age: 0.3,
  //     location: 'São Paulo / SP',
  //     shelter: 'Canto da Terra'
  //   },
  //   {
  //     name: 'Ximena',
  //     imageUrl: 'https://via.placeholder.com/300x200.png',
  //     gender: 'Female',
  //     size: 'Médio',
  //     age: 0.3,
  //     location: 'São Paulo / SP',
  //     shelter: 'Canto da Terra'
  //   },
  //   {
  //     name: 'Why can',
  //     imageUrl: 'https://via.placeholder.com/300x200.png',
  //     gender: 'Male',
  //     size: 'Médio',
  //     age: 0.3,
  //     location: 'São Paulo / SP',
  //     shelter: 'Canto da Terra'
  //   }
  // ];
}
