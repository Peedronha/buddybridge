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
import {ImageUploadService} from "../../../../restrict/base/adoption-profile/shared/image-upload.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-adoption-grid',
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

  imagePreview: string | ArrayBuffer | null = null; // Stores the image preview URL

  imageFile!: File;

  genero = [
    { label: 'Fêmea', value: 'Female' },
    { label: 'Macho', value: 'Male' },
  ];

  constructor(private animalService: AnimalService, private adoptionService: AdoptionService, private imageService: ImageUploadService, private route: Router) {}

  ngOnInit() {
    this.adoptionService.getAnimalsByProfileStatus().subscribe((data: AnimalCard[]) => {
      console.log('Received data:', data);
      this.animals = data;
    });
  }

  onFileInput(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];

      // Create a URL for the image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Stores the preview URL
      };
      reader.readAsDataURL(this.imageFile); // Reads file data as URL
    }
  }

  imageSrc: string | null = null;

  // loadImage(event: any) {
  //   this.imageFile = event.target.files[0];
  //
  //   // Create a preview URL for the selected image
  //   if (this.imageFile) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imagePreview = e.target.result; // Set the preview URL
  //     };
  //     reader.readAsDataURL(this.imageFile);
  //   }
  // }

  loadImage(key: any) {
    this.imageSrc = `data:image/jpeg;base64,${key}`;
    return this.imageSrc
  }

  onAdd(idAnimal: number | undefined) {
    if(localStorage.getItem('token') != null && localStorage.getItem('token') != ''){
      this.add.emit(idAnimal);
    } else {
      this.route.navigateByUrl('/register');
    }
  }

  getGenderLabel(genderValue: string | undefined): string {
    const gender = this.genero.find(g => g.value === genderValue);
    return gender ? gender.label : 'Unknown';
  }
}
