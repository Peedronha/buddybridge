import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {AnimalModel} from "../../model/animal.model";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AnimalService} from "../../service/animal.service";

@Component({
  selector: 'app-list-animal',
  templateUrl: './list-animal.component.html',
  styleUrl: './list-animal.component.scss'
})
export class ListAnimalComponent {

  @Input() animals!: AnimalModel[];
  _specificAnimal: any = {};
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() editPassword = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);


  editForm = this.fb.group({
    nome_animal: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    raca: ['', Validators.required],
    idade: ['', Validators.required],
    peso_animal: ['', Validators.required],
    comprimento_animal: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    data_resgate: ['', Validators.required],
  });


  loading: boolean = false;

  showHidden: boolean = false;

  showEdit: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private animalService: AnimalService, private router: Router) {

  }


  ngOnInit(): void {
    this.animalService.getAnimals().subscribe((data: AnimalModel[]) => {
      console.log(data)
      this.animals = data;
    });
  }


  onSearch(event: any) {
    const searchTerm = event.target.value;
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(idUser: any) {
    this.edit.emit(idUser);
  }

  onDelete(idUser: any) {
    this.remove.emit(idUser);
  }
}
