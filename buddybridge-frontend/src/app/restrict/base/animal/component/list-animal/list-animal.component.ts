import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { AnimalModel } from "../../model/animal.model";
import { AnimalService } from "../../service/animal.service";
import { HistoricoMedicoService } from '../../../historico-medico/service/historico-medico.service';

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

  @Output() addHistoricoMedico = new EventEmitter<number>();
  @Output() editHistoricoMedico = new EventEmitter<number>();
  @Output() removeHistoricoMedico = new EventEmitter<number>();

  selectedAnimal?: AnimalModel;
  displayHistoricoDialog: boolean = false;
  medicalHistory: any[] = []; // Estrutura de dados para armazenar o histórico médico do animal

  loading: boolean = false;
  displayDeleteDialog: boolean = false;
  displayDeleteDialogHistorico: boolean = false;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private animalService: AnimalService,
              private historicoMedicoService: HistoricoMedicoService,
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

  //CRUD - animais
  onAdd() {
    this.add.emit(true);
  }
  onEdit(idAnimal: number) {
    this.edit.emit(idAnimal);
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
  onDelete(idAnimal: number) {
    this.remove.emit(idAnimal);
  }

  //CRUD - historico médico
  onHistoricoMedico(animal: AnimalModel) {
    this.selectedAnimal = animal;
    this.historicoMedicoService.getMedicalReportByAnimalId(animal.id_animal!).subscribe(
      (data) => {
        this.medicalHistory = data;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar o histórico médico' });
      }
    );
    this.displayHistoricoDialog = true;
  }
  onAddHistorico() {
    this.displayHistoricoDialog = false;
    this.addHistoricoMedico.emit(this.selectedAnimal?.id_animal);
  }
  onEditHistorico(history: any) {
    this.displayHistoricoDialog = false;
    this.editHistoricoMedico.emit(history.medicalReportId);
  }
  showDeleteDialogHistorico(entity: any) {
    this._specificEntity = entity;
    this.displayDeleteDialogHistorico = true;
  }
  onCancelDeleteHistorico() {
    this._specificEntity = null;
    this.displayDeleteDialogHistorico = false;
  }
  confirmDeleteHistorico() {
    if (this._specificEntity) {
      this.onDeleteHistorico(this._specificEntity.medicalReportId);
      this._specificEntity = null;
      this.displayDeleteDialog = false;
    }
  }
  onDeleteHistorico(idAnimal: number) {
    this.removeHistoricoMedico.emit(idAnimal);
  }

}
