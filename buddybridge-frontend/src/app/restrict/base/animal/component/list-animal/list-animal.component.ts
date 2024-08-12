import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { AnimalModel } from "../../model/animal.model";
import { AnimalService } from "../../service/animal.service";

@Component({
  selector: 'app-list-animal',
  templateUrl: './list-animal.component.html',
  styleUrls: ['./list-animal.component.scss']
})
export class ListAnimalComponent {

  @Input() animals!: AnimalModel[];
  _specificEntity: any = {};
  @Output() add = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  editForm = this.fb.group({
    nome_animal: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    raca: ['', Validators.required],
    idade: ['', Validators.required],
    peso_animal: ['', Validators.required],
    comprimento_animal: ['', [Validators.required, Validators.pattern(/^\d{1,2000}$/)]],
    data_resgate: ['', Validators.required],
  });

  loading: boolean = false;
  displayDeleteDialog: boolean = false;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private animalService: AnimalService,
              private router: Router) {}

  ngOnInit(): void {
    this.animalService.getAnimals().subscribe((data: AnimalModel[]) => {
      this.animals = data;
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    // Implement search functionality
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idAnimal: number) {
    this.edit.emit(idAnimal);
  }

  onDelete(idAnimal: number) {
    this.remove.emit(idAnimal);
  }

  showDeleteDialog(entity: any) {
    this._specificEntity = entity;
    this.displayDeleteDialog = true;
  }

  onCancelDelete() {
    this._specificEntity = null;
    this.displayDeleteDialog = false;
  }

  confirmDelete() {
    if (this._specificEntity) {
      this.onDelete(this._specificEntity.id_animal);

      this._specificEntity = null;

      this.displayDeleteDialog = false;
    }
  }
}
